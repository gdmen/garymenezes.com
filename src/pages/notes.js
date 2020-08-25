import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

export default function Notes({ data }) {
  return (
    <Layout>
      <h4
        style={{
          filter: "opacity(25%)",
          textAlign: "center",
        }}
      >
        Notes
      </h4>
      <section>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {data.allMdx.edges.map(({ node }) => (
            <div key={node.id}>
              <Link
                to={node.fields.slug}
                style={{
                  color: "var(--text-color)",
                  textDecoration: "none",
                }}
              >
                <div>{node.frontmatter.title}</div>
                <Img fluid={node.frontmatter.image.childImageSharp.fluid} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(filter: { fields: { type: { eq: "book" } } }) {
      totalCount
      edges {
        node {
          id
          fields {
            book
            slug
          }
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
