import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

export const Head = ({ data }) => {
  const node = data.mdx
  return (
    <Seo title={node.frontmatter.title} />
  )
}

export default function Project({ data, location, children }) {
  return (
    <Layout padded={false} path={location.pathname}>
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
