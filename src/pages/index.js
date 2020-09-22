import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "./index.module.css"

export default function Index({ data }) {
  const gary = data.gary.edges[0].node
  return (
    <Layout>
      <SEO title="home" />
      <Img
        className={styles.image}
        fluid={gary.frontmatter.image.childImageSharp.fluid}
        alt={`A photo of ${gary.frontmatter.name}`}
      />
    </Layout>
  )
}

export const query = graphql`
  query {
    gary: allMdx(
      filter: {
        frontmatter: {
          draft: { ne: true }
          type: { eq: "person" }
          name: { eq: "Gary Menezes" }
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            name
            image {
              childImageSharp {
                fluid(maxWidth: 900) {
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
