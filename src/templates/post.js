import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "./post.module.css"

export default function Post({ data }) {
  const node = data.mdx
  return (
    <Layout page="blog">
      <SEO title={node.frontmatter.title} />
      <article className={styles.post}>
        <div className={styles.heading}>
          <h1 className={styles.title}>{node.frontmatter.title}</h1>
          <span className={styles.date}>{node.frontmatter.date}</span>
        </div>
        <div className={`${styles.content} mdx`}>
          <MDXRenderer frontmatter={node.frontmatter}>{node.body}</MDXRenderer>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        updated(formatString: "MMMM D, YYYY")
      }
    }
  }
`
