import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default function Index({ data }) {
  return (
    <Layout>
      <h1>All Pages</h1>
      {data.allMdx.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
        </div>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
