import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "./blog.module.css"

export default function Blog({ data }) {
  return (
    <Layout page="blog">
      <SEO title="blog" />
      <section>
        <div className={styles.list}>
          {data.allMdx.edges.map(({ node }) => (
            <Link key={node.id} to={node.fields.slug} className={styles.post}>
              <div className={styles.date}>{node.frontmatter.date}</div>
              <div className={styles.title}>{node.frontmatter.title}</div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true }, type: { eq: "post" } } }
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
          }
        }
      }
    }
  }
`
