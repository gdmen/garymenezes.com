# garymenezes.com

## Requirements:
* node v16.20.0
* gatsby (npm install -g gatsby-cli)
  * Gatsby CLI version: 2.19.3
  * Gatsby version: 2.32.13

## Setup:
* create deploy.mk and put your deploy scp / whatever commands in there as a default make target.
* create `.env.development` and `.env.production` (both gitignored) with:
  * `JOURNAL_PASSWORD=...`
  * `CONTENT_DIR="/absolute/path/to/content/directory"` — omit to use the default `./content`.
  * `OBSIDIAN_LINK_PREFIX="Path/Prefix/Used/By/In-Note/Links/"` — the prefix in-note links carry, stripped during hydration (trailing slash included). Required.

## Content workflow:
* Content lives in `.md` files in the directory named by `CONTENT_DIR` in `.env.development` / `.env.production`. Default: `./content`.
* `scripts/hydrate.mjs` converts them to `.mdx` in `_generated/` (gitignored), which is what Gatsby sources.
* Hydration runs automatically inside `gatsby build` and `gatsby develop` (watch mode included), via `onPreBootstrap` in `gatsby-node.js`. Run manually with `npm run hydrate`.
* Never edit `.mdx` files — edit the `.md` in `content/`.

## Maintenance:
* npm update
