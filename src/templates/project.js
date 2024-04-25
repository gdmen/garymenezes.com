import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

export default function Project({ data, location, children }) {
  const node = data.mdx
  return (
    <Layout padded={false} path={location.pathname}>
      <Seo title={node.frontmatter.title} />
      <div className="mdx">
        {children}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`
