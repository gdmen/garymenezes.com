import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Blog({ data }) {
  return (
    <Layout page="blog">
      <SEO title="blog" />
      <h4
        style={{
          textAlign: "center",
        }}
      >
        experiments, tutorials, and what I'm learning
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
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true }, type: { eq: "post" } } }
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
