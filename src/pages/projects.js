import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Projects({ data }) {
  return (
    <Layout page="projects">
      <SEO title="projects" />
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
    allMdx(
      filter: { frontmatter: { draft: { ne: true }, type: { eq: "project" } } }
    ) {
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
