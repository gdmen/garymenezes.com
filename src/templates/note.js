import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BookTOC from "../components/book_toc"

import styles from "./note.module.css"

export default function Note({ data }) {
  return (
    <Layout page="notes">
      <SEO title={data.mdx.frontmatter.title} />
      <div className={styles.book}>
        {data.mdx.frontmatter.toc && (
          <div className={styles.toc}>
            <BookTOC edges={data.allMdx.edges} />
          </div>
        )}
        <div className={`${styles.note} mdx`}>
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
        date(formatString: "MMMM DD, YYYY")
        difficulty
        number
        title
        url
        toc
      }
    }
    allMdx(
      sort: { fields: [frontmatter___number], order: ASC }
      filter: {
        frontmatter: {
          draft: { ne: true }
          type: { in: ["note", "book"] }
          book: { eq: $book }
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
            number
            title
          }
        }
      }
    }
  }
`
