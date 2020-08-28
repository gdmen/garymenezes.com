import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

import styles from "./notes.module.css"

export default function Notes({ data }) {
  return (
    <Layout>
      <section>
        <ul className={styles.book_list}>
          {data.allMdx.edges.map(({ node }) => (
            <li className={styles.book} key={node.id}>
              <Link to={node.fields.slug}>
                <Img
                  className={styles.cover}
                  fluid={node.frontmatter.image.childImageSharp.fluid}
                />
                <span className={styles.title}>{node.frontmatter.title}</span>
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
      sort: { fields: [fields___book], order: ASC }
      filter: { fields: { type: { eq: "book" } } }
    ) {
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
