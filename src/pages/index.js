import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "./index.module.css"

export default function Index({ data }) {
  const mdx_nodes = data.mdx_nodes.edges || []
  const [state, setState] = useState({
    query: "",
    filtered: mdx_nodes,
  })

  const handleQuery = event => {
    const query = event.target.value

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
          .includes(query.toLowerCase()))
      )
    })

    setState({
      query,
      filtered,
    })
  }

  const { query, filtered } = state

  return (
    <Layout>
      <SEO title="home" />
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
              {node.frontmatter.tags.map(tag => (
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
      sort: { fields: [frontmatter___date], order: [DESC] }
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
          }
          frontmatter {
            date(formatString: "ll")
            title
            tags
          }
        }
      }
    }
  }
`
