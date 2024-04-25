import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

import * as styles from "./index.module.css"

export default function Index({ data, location }) {
  const mdx_nodes = data.mdx_nodes.edges || []
  const [state, setState] = useState({
    searchQ: "",
    filtered: mdx_nodes,
  })

  const handleQuery = event => {
    const searchQ = event.target.value

    const filtered = mdx_nodes.filter(({ node }) => {
      const body = node.body
      const tags = node.fields.tags
      const title = node.frontmatter.title
      return (
        body.toLowerCase().includes(searchQ.toLowerCase()) ||
        title.toLowerCase().includes(searchQ.toLowerCase()) ||
        (tags && tags
          .join("")
          .toLowerCase()
          .includes(searchQ.toLowerCase()))
      )
    })

    setState({
      searchQ,
      filtered,
    })
  }

  const { filtered } = state

  return (
    <Layout path={location.pathname}>
      <Seo title="home" />
      <section className="readable">
      <div className={styles.search}>
        <i className="fa fa-search"></i>
        <input
          type="text"
          aria-label="search"
          placeholder="search notes..."
          onChange={handleQuery}
        />
      </div>
      {filtered.map(({ node }) => (
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
                <span className={styles.tag}>#{tag}</span>
              ))}
              </span>
            </div>
          </Link>
        </article>
        ))}
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
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
            title
          }
        }
      }
    }
  }
`
