import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

import styles from "./notes.module.css"

export default function Notes({ data }) {
  return (
    <Layout page="notes">
      <section>
        <ul className={styles.book_list}>
          {data.allMdx.edges.map(({ node }) => (
            <li key={node.id}>
              <Link className={styles.book} to={node.fields.slug}>
                {node.frontmatter.image && (
                  <Img
                    className={styles.cover}
                    fluid={node.frontmatter.image.childImageSharp.fluid}
                  />
                )}
                <div className={styles.title}>
                  <span>{node.frontmatter.title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___book], order: ASC }
      filter: {
        frontmatter: { draft: { ne: true }, type: { eq: "book" } }
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
