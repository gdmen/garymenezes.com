import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BookTOC from "../components/book_toc"

import styles from "./note.module.css"
import mdxstyle from "../components/mdx.module.css"

export default function Note({ data }) {
  return (
    <Layout>
      <SEO title={data.mdx.frontmatter.title} />
      <div className={styles.book}>
        <div className={styles.toc}>
          <BookTOC edges={data.allMdx.edges} />
        </div>
        <div className={`${styles.note} ${mdxstyle.mdx}`}>
          <MDXRenderer frontmatter={data.mdx.frontmatter}>
            {data.mdx.body}
          </MDXRenderer>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $book: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        authors
        date(formatString: "MMMM D, YYYY")
        difficulty
        number
        title
        url
      }
    }
    allMdx(
      sort: { fields: [frontmatter___number], order: ASC }
      filter: {
        fields: { type: { in: ["note", "book"] }, book: { eq: $book } }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
            type
          }
          frontmatter {
            number
            title
          }
        }
      }
    }
  }
`
