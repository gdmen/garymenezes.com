import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "./note.module.css"

export default function Note({ data }) {
  const node = data.mdx
  return (
    <Layout page="note">
      <SEO title={node.frontmatter.title} />
      <div className="readable">
        <article className={styles.note}>
          <div className={styles.heading}>
            <h1 className={styles.title}>{node.frontmatter.title}</h1>
            <span className={styles.date}>{node.frontmatter.date}</span>
          </div>
          <div className={`mdx`}>
            <MDXRenderer frontmatter={node.frontmatter}>
              {node.body}
            </MDXRenderer>
          </div>
        </article>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`
