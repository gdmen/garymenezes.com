import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

import * as styles from "./index.module.css"

export const Head = () => (
  <Seo title="home | Gary Menezes" />
)

const CARD_MAX = 5

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
        <Link to={node.fields.slug} className={styles.row} key={node.fields.slug}>
          <span className={styles.rowTitle}>{node.frontmatter.title}</span>
          <span className={styles.rowDate}>{node.frontmatter.monthYear}</span>
        </Link>
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

  const q = searchQ.toLowerCase()
  const matches = nodes.filter(node =>
    node.body.toLowerCase().includes(q) ||
    node.frontmatter.title.toLowerCase().includes(q) ||
    (node.fields.tags && node.fields.tags.join("").toLowerCase().includes(q))
  )

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
      <div className={styles.search}>
        <i className="fa fa-search"></i>
        <input
          type="text"
          aria-label="search"
          placeholder="search notes..."
          onChange={event => setSearchQ(event.target.value)}
        />
      </div>
      {searchQ ? (
        matches.map(node => <NoteArticle node={node} key={node.id} />)
      ) : (
        <>
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
        </>
      )}
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
