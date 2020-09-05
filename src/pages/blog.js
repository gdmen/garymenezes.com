import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default function Blog({ data }) {
  return (
    <Layout>
      <h4
        style={{
          filter: "opacity(25%)",
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
      filter: {
        fields: { type: { eq: "post" } }
        frontmatter: { draft: { eq: false } }
      }
    ) {
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
