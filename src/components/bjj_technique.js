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
            tags: { in: ["jiujitsu", "techniques"] }
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
              title
            }
          }
        }
      }
    }
  `)
  let slug = "/jiujitsu/techniques/" + number + "/";
  // Doing an O(n) search here which is kinda dumb.
  return (
    <div className={styles.technique} className="bordered">
    {data.allMdx.edges.map(({ node }) => (
        node.fields.slug === slug &&
        ((
          !brief &&
          <section key={node.id}>
            <Link to={node.fields.slug}>
              <h3>
                <i className="fa fa-link"></i>
                &nbsp;
                {node.frontmatter.title}
              </h3>
            </Link>
            <MDXRenderer key={node.id}  frontmatter={node.frontmatter}>
              {node.body}
            </MDXRenderer>
          </section>
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
  number: PropTypes.string.isRequired,
}

export default BjjTechnique
