import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"

import styles from "./bjj_technique.module.css"

const BjjTechnique = ({ number }) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        filter: {
          frontmatter: {
            draft: { ne: true }
            type: { eq: "note" }
            book: { eq: "bjjtechniques" }
          }
        }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            body
            frontmatter {
              number
              title
            }
          }
        }
      }
    }
  `)
  // Doing an O(n) search here which is kinda dumb.
  return (
    <div className={styles.technique}>
    {data.allMdx.edges.map(({ node }) => (
      node.frontmatter.number === number &&
        <MDXRenderer key={node.id}  frontmatter={node.frontmatter}>
          {node.body}
        </MDXRenderer>
    ))}
    </div>
  )
}

BjjTechnique.propTypes = {
  number: PropTypes.number.isRequired,
}

export default BjjTechnique
