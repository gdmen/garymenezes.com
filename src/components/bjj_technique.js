import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import { MDXProvider } from "@mdx-js/react"

import * as styles from "./bjj_technique.module.css"

const BjjTechnique = ({ number, brief=false, children }) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        filter: {
          frontmatter: {
            draft: { ne: true }
            type: { eq: "note" }
          }
        }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
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
  let technique
  data.allMdx.edges.map(({node}) => {
    if (node.fields.slug === slug) {
      technique = node
    }
  })
  return (
    <div className={`${styles.technique} bordered`}>
      {(
        !brief &&
        <section key={technique.id}>
          <Link to={technique.fields.slug} className={styles.title}>
            <h3>
              {technique.frontmatter.title}
            </h3>
          </Link>
          <div className="mdx">
            <MDXProvider>{children}</MDXProvider>
          </div>
        </section>
      ) || (
        brief &&
        <section key={technique.id} className={styles.brief}>
          <Link to={technique.fields.slug} className={styles.title}>
            <h3>
              <i className="fa fa-link"></i>
              &nbsp;
              {technique.frontmatter.title}
            </h3>
          </Link>
        </section>
      )}
    </div>
  )
}

BjjTechnique.propTypes = {
  number: PropTypes.number.isRequired,
}

export default BjjTechnique
