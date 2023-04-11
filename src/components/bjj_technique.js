import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql, Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"

import styles from "./bjj_technique.module.css"

const BjjTechnique = ({ number, brief=false }) => {
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
        ((
          !brief &&
          <MDXRenderer key={node.id}  frontmatter={node.frontmatter}>
            {node.body}
          </MDXRenderer>
        ) || (
          brief &&
          <section key={node.id} className={styles.brief}>
            <Link to={node.fields.slug}>
              <h3>
                <i className="fa fa-link"></i>
                &nbsp;
                {node.frontmatter.title}
              </h3>
            </Link>
          </section>
        ))
    ))}
    </div>
  )
}

BjjTechnique.propTypes = {
  number: PropTypes.number.isRequired,
}

export default BjjTechnique
