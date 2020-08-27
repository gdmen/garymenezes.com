import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BookTOC from "../components/book_toc"

export default function Note({ data }) {
  return (
    <Layout>
      <SEO title={data.mdx.frontmatter.title} />
      <BookTOC edges={data.allMdx.edges} />
      <div className="mdx">
        <MDXRenderer frontmatter={data.mdx.frontmatter}>
          {data.mdx.body}
        </MDXRenderer>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $book: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        authors
      }
    }
    allMdx(
      filter: {
        fields: { type: { in: ["note", "book"] }, book: { eq: $book } }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
