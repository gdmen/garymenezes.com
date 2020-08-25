import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Page({ data }) {
  const page = data.mdx
  return (
    <Layout>
      <SEO title={page.frontmatter.title} />
      <div>{page.frontmatter.date}</div>
      <div className="mdx">
        <MDXRenderer>{page.body}</MDXRenderer>
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
      }
    }
  }
`
