import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Project({ data }) {
  return (
    <Layout page="project" padded={false}>
      <SEO title={data.mdx.frontmatter.title} />
      <div className="mdx">
        <MDXRenderer frontmatter={data.mdx.frontmatter}>
          {data.mdx.body}
        </MDXRenderer>
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
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`
