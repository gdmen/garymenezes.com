import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "./index.module.css"

export default function Index({ data }) {
  const post = data.blog.edges[0].node
  const notes = data.notes.edges
  return (
    <Layout>
      <SEO title="home" />
      <div className={styles.cols}>
        <div className={styles.blogHighlight}>
          <div className={styles.colHeader}>
            <h4>Latest Post</h4>
          </div>
          <Link to={post.fields.slug} className={styles.post}>
            <div className={styles.date}>{post.frontmatter.date}</div>
            <h4 className={styles.title}>{post.frontmatter.title}</h4>
            <div className="mdx">
              <p className={styles.excerpt}>{post.excerpt}</p>
            </div>
          </Link>
        </div>
        <div className={styles.noteHighlight}>
          <div className={styles.colHeader}>
            <h4>Recent Notes</h4>
          </div>
          {notes.map(({ node }) => (
            <div>
              <Link key={node.id} to={node.fields.slug} className={styles.note}>
                <div className={styles.date}>{node.frontmatter.date} - {node.frontmatter.book}</div>
                <h5 className={styles.title}>
                  {node.frontmatter.title}
                </h5>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    blog: allMdx(
      limit: 1
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true }, type: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
    notes: allMdx(
      limit: 5
      sort: { fields: [frontmatter___date], order: [DESC] }
      filter: {
        frontmatter: {
          draft: { ne: true }
          type: { eq: "note" }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            book
          }
        }
      }
    }
  }
`
