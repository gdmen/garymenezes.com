import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Post({ data }) {
  const node = data.mdx
  return (
    <Layout>
      <SEO title={node.frontmatter.title} />
      <div>{node.frontmatter.date}</div>
      <div className="mdx">
        <MDXRenderer frontmatter={node.frontmatter}>{node.body}</MDXRenderer>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date
      }
    }
  }
`
