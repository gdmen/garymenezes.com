import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default function Projects({ data }) {
  return (
    <Layout page="projects">
      <h4
        style={{
          textAlign: "center",
        }}
      >
        projects
      </h4>
      <section>
        <div
          style={{
            display: "grid",
          }}
        >
          {data.allMdx.edges.map(({ node }) => (
            <div key={node.id}>
              <h4>
                <Link
                  to={node.fields.slug}
                  style={{
                    color: "var(--text-color)",
                    textDecoration: "none",
                  }}
                >
                  {node.frontmatter.title}
                </Link>
              </h4>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(filter: { fields: { type: { eq: "project" } } }) {
      totalCount
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
