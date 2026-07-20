import React, { useEffect, useRef, useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

import * as styles from "./index.module.css"

export const Head = () => (
  <Seo title="home | Gary Menezes" />
)

const CARD_MAX = 5

const TITLE_WEIGHT = 4
const TAG_WEIGHT = 2
const BODY_WEIGHT = 1

const tokenize = query => query.toLowerCase().split(/\s+/).filter(Boolean)

// Every token must match somewhere; a node's score sums its tokens' field weights.
const scoreNode = (node, tokens) => {
  const title = node.frontmatter.title.toLowerCase()
  const tags = (node.fields.tags || []).map(tag => tag.toLowerCase())
  const body = node.body.toLowerCase()
  let score = 0
  for (const token of tokens) {
    let tokenScore = 0
    if (title.includes(token)) tokenScore += TITLE_WEIGHT
    if (tags.some(tag => tag.includes(token))) tokenScore += TAG_WEIGHT
    if (body.includes(token)) tokenScore += BODY_WEIGHT
    if (!tokenScore) return 0
    score += tokenScore
  }
  return score
}

const searchNodes = (nodes, query) => {
  const tokens = tokenize(query)
  if (!tokens.length) return []
  return nodes
    .map(node => ({ node, score: scoreNode(node, tokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ node }) => node)
}

const NoteArticle = ({ node }) => (
  <article>
    <Link to={node.fields.slug}>
      <h4 className={styles.title}>
        {node.frontmatter.title}
      </h4>
      <div className={styles.meta}>
        <span className={styles.date}>
          {node.frontmatter.date}
        </span>
        <span className={styles.tags}>
        {node.fields.tags && node.fields.tags.map(tag => (
          <span className={styles.tag} key={tag}>#{tag}</span>
        ))}
        </span>
      </div>
    </Link>
  </article>
)

const NoteRow = ({ node, showTags }) => (
  <Link to={node.fields.slug} className={styles.row}>
    <span className={styles.rowTitle}>{node.frontmatter.title}</span>
    {showTags && node.fields.tags && (
      <span className={styles.rowTags}>
        {node.fields.tags.map(tag => (
          <span className={styles.tag} key={tag}>#{tag}</span>
        ))}
      </span>
    )}
    <span className={styles.rowDate}>{node.frontmatter.monthYear}</span>
  </Link>
)

const CollectionCard = ({ collection, notes }) => (
  <div className={styles.card}>
    <div className={styles.cardHead}>
      <span
        className={styles.dot}
        style={{ backgroundColor: `var(--${collection.color})` }}
      ></span>
      <h2>{collection.title}</h2>
      <span className={styles.count}>{notes.length}</span>
    </div>
    <div className={styles.cardBody}>
      {notes.slice(0, CARD_MAX).map(node => (
        <NoteRow node={node} key={node.fields.slug} />
      ))}
    </div>
    {notes.length > CARD_MAX && (
      <Link to={`/${collection.dir}/`} className={styles.cardFoot}>
        <span>all {notes.length} &rarr;</span>
        <span className={styles.cardFootPath}>/{collection.dir}/</span>
      </Link>
    )}
  </div>
)

export default function Index({ data, location }) {
  const nodes = data.mdx_nodes.edges.map(({ node }) => node)
  const collections = data.collection_nodes.edges.map(({ node }) => ({
    dir: node.fields.slug
      .replace(/_collection\/$/, "")
      .replace(/^\/|\/$/g, ""),
    title: node.frontmatter.title,
    color: node.frontmatter.color,
  }))
  const findCollection = slug =>
    collections.find(c => slug.startsWith(`/${c.dir}/`))
  const [searchQ, setSearchQ] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const onMouseDown = event => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", onMouseDown)
    return () => document.removeEventListener("mousedown", onMouseDown)
  }, [])

  const resultsOpen = searchOpen && !!searchQ

  const matches = searchNodes(nodes, searchQ)

  const writing = nodes.filter(node => !findCollection(node.fields.slug))
  const cards = collections
    .map(collection => ({
      collection,
      notes: nodes.filter(node => findCollection(node.fields.slug) === collection),
    }))
    .filter(({ notes }) => notes.length > 0)

  return (
    <Layout path={location.pathname}>
      <section className="readable">
      {resultsOpen && <div className={styles.overlay}></div>}
      <div
        className={styles.search}
        ref={searchRef}
        onKeyDown={event => event.key === "Escape" && setSearchOpen(false)}
      >
        <i className="fa fa-search"></i>
        <input
          type="text"
          role="combobox"
          aria-label="search"
          aria-expanded={resultsOpen}
          placeholder="search notes..."
          value={searchQ}
          onChange={event => {
            setSearchQ(event.target.value)
            setSearchOpen(true)
          }}
          onFocus={() => setSearchOpen(true)}
          onClick={() => setSearchOpen(true)}
        />
        {resultsOpen && (
          <div className={styles.results}>
            {matches.length ? (
              matches.map(node => <NoteRow node={node} showTags key={node.id} />)
            ) : (
              <div className={styles.noResults}>no matches</div>
            )}
          </div>
        )}
      </div>
      <div className={styles.kicker}>writing &amp; projects</div>
      <div className={styles.writing}>
        {writing.map(node => <NoteArticle node={node} key={node.id} />)}
      </div>
      <div className={styles.kicker}>notes</div>
      <div className={styles.cards}>
        {cards.map(({ collection, notes }) => (
          <CollectionCard
            collection={collection}
            notes={notes}
            key={collection.dir}
          />
        ))}
      </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    collection_nodes: allMdx(
      sort: {frontmatter: {order: ASC}}
      filter: {
        frontmatter: {
          draft: { ne: true }
          type: { eq: "collection" }
        }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            color
            title
          }
        }
      }
    }
    mdx_nodes: allMdx(
      sort: {frontmatter: {date: DESC}}
      filter: {
        frontmatter: {
          draft: { ne: true }
          type: { in: ["note", "post", "project"] }
        }
      }
    ) {
      edges {
        node {
          id
          body
          fields {
            slug
            tags
          }
          frontmatter {
            date(formatString: "ll")
            monthYear: date(formatString: "MMM YYYY")
            title
          }
        }
      }
    }
  }
`
