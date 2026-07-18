// One-way content pipeline: Obsidian .md sources in content/ -> .mdx build
// artifacts in _generated/ (gitignored). Pass order in hydrate() is
// load-bearing: full embeds are inlined before the brief-link and
// internal-link passes so links inside inlined bodies get hydrated too.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const VAULT_PREFIX = 'Atlas/Notes/Ideas/garymenezes.com_content/'
const SRC_DIR = 'content'
const OUT_DIR = '_generated'

const IGNORED_DIRS = new Set(['__pycache__'])
const IGNORED_FILES = [/\.pyc$/, /~$/, /\.swp$/, /\.mdx$/]

// Dot-entries (.git, .obsidian, .DS_Store, ...) are never content.
const isIgnored = (name, isDir) =>
  name.startsWith('.') ||
  (isDir ? IGNORED_DIRS.has(name) : IGNORED_FILES.some((re) => re.test(name)))

const RE_BORDERED = />(?:\s?)*\[!NOTE\]((?:\n>[^\n]*)+)/g
const RE_EMBED = /!\[\[([^\]]+)\]\]/g
const RE_EMBED_BRIEF = /\[\[([^\]]+)\]\]/g
const RE_FRONTMATTER = /^\s*---(?:(?!---)[\s\S])+---\s*/
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const RE_INTERNAL_LINK = new RegExp(
  String.raw`\[[^\]]+\](\(` + escapeRegExp(VAULT_PREFIX) + String.raw`[^)]+\))`,
  'g'
)

// String.replaceAll with a string replacement interprets $-patterns ($$, $&),
// which would corrupt note content containing math; split/join replaces every
// occurrence literally.
const replaceAllLiteral = (s, find, repl) => s.split(find).join(repl)

function hydrate(text, readEmbed) {
  for (const m of [...text.matchAll(RE_BORDERED)]) {
    const body = '<div class="bordered">\n' + replaceAllLiteral(m[1], '\n> ', '\n') + '\n\n</div>'
    text = replaceAllLiteral(text, m[0], body)
  }
  for (const m of [...text.matchAll(RE_EMBED)]) {
    const slug = replaceAllLiteral(m[1], VAULT_PREFIX, '')
    text = replaceAllLiteral(text, m[0], '<Embed slug={"' + slug + '"}>\n\n' + readEmbed(slug) + '\n</Embed>')
  }
  for (const m of [...text.matchAll(RE_EMBED_BRIEF)]) {
    const slug = replaceAllLiteral(m[1], VAULT_PREFIX, '')
    text = replaceAllLiteral(text, m[0], '<Embed slug={"' + slug + '"} brief={true}></Embed>')
  }
  for (const m of [...text.matchAll(RE_INTERNAL_LINK)]) {
    text = replaceAllLiteral(text, m[1], replaceAllLiteral(m[1], VAULT_PREFIX, '/'))
  }
  return text
}

function* walk(dir, rel = '', filtered = true) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (!filtered || !isIgnored(e.name, true)) {
        yield* walk(path.join(dir, e.name), path.join(rel, e.name), filtered)
      }
    } else if (e.isFile()) {
      if (!filtered || !isIgnored(e.name, false)) {
        yield path.join(rel, e.name)
      }
    }
  }
}

function pruneEmptyDirs(dir, keep) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) pruneEmptyDirs(path.join(dir, e.name), false)
  }
  if (!keep && fs.readdirSync(dir).length === 0) fs.rmdirSync(dir)
}

export function hydrateAll(root = process.cwd()) {
  const src = path.join(root, SRC_DIR)
  const out = path.join(root, OUT_DIR)

  const srcFiles = [...walk(src)]
  if (!srcFiles.some((rel) => rel.endsWith('.md'))) {
    throw new Error(`no .md files found in ${src} — is the content submodule initialized?`)
  }

  fs.mkdirSync(out, { recursive: true })

  // Remove stale entries before writing so a file<->directory shape change
  // in content/ can't collide with a leftover path in _generated/.
  const expected = new Set(
    srcFiles.map((rel) => (rel.endsWith('.md') ? rel.slice(0, -3) + '.mdx' : rel))
  )
  let removed = 0
  for (const rel of walk(out, '', false)) {
    if (!expected.has(rel)) {
      fs.rmSync(path.join(out, rel))
      removed++
    }
  }
  pruneEmptyDirs(out, true)

  const readEmbed = (slug) => {
    const text = fs.readFileSync(path.join(src, slug + '.md'), 'utf8')
    const m = text.match(RE_FRONTMATTER)
    return m ? replaceAllLiteral(text, m[0], '') : text
  }

  // Write only when content differs: gatsby watches _generated/, so
  // gratuitous writes in develop mode would cause rebuild loops.
  let written = 0
  for (const rel of srcFiles) {
    const srcPath = path.join(src, rel)
    if (rel.endsWith('.md')) {
      const buf = Buffer.from(hydrate(fs.readFileSync(srcPath, 'utf8'), readEmbed))
      const dest = path.join(out, rel.slice(0, -3) + '.mdx')
      if (fs.existsSync(dest) && buf.equals(fs.readFileSync(dest))) continue
      fs.mkdirSync(path.dirname(dest), { recursive: true })
      fs.writeFileSync(dest, buf)
      written++
    } else {
      // Assets can be large (video); a size+mtime match skips reading their
      // bytes. Copies get the source mtime, compared with <1ms tolerance for
      // utimes precision loss.
      const dest = path.join(out, rel)
      const s = fs.statSync(srcPath)
      let d = null
      try {
        d = fs.statSync(dest)
      } catch {}
      if (d && d.size === s.size && Math.abs(d.mtimeMs - s.mtimeMs) < 1) continue
      fs.mkdirSync(path.dirname(dest), { recursive: true })
      fs.copyFileSync(srcPath, dest)
      fs.utimesSync(dest, s.atime, s.mtime)
      written++
    }
  }

  return { files: srcFiles.length, written, removed }
}

export async function watch(root = process.cwd()) {
  const { default: chokidar } = await import('chokidar')
  const src = path.join(root, SRC_DIR)
  let timer = null
  const run = () => {
    try {
      const { written, removed } = hydrateAll(root)
      if (written || removed) {
        console.log(`hydrate: ${written} file(s) written, ${removed} removed`)
      }
    } catch (err) {
      console.error(`hydrate: ${err.message}`)
    }
  }
  const schedule = () => {
    clearTimeout(timer)
    timer = setTimeout(run, 200)
  }
  chokidar
    .watch(src, {
      ignored: (p) => {
        const rel = path.relative(src, p)
        return (
          rel !== '' &&
          (rel.split(path.sep).some((seg) => isIgnored(seg, true)) ||
            IGNORED_FILES.some((re) => re.test(path.basename(p))))
        )
      },
      ignoreInitial: true,
    })
    .on('all', schedule)
    // Catch edits made between the initial hydrateAll and the watcher
    // becoming ready; a no-change run is nearly free.
    .on('ready', schedule)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { files, written, removed } = hydrateAll()
  console.log(`hydrate: ${files} file(s), ${written} written, ${removed} removed`)
  if (process.argv.includes('--watch')) {
    await watch()
    console.log('hydrate: watching content/ for changes')
  }
}
