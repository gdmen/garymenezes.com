import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import { MDXProvider } from "@mdx-js/react"

import * as styles from "./embed.module.css"


function get_trimmed_path(path) {
  return path.split('/').filter(x => x).join('/')
}

const Embed = ({ slug, brief=false, children }) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        filter: {
          frontmatter: {
            draft: { ne: true }
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
  // Doing an O(n) search here which is kinda dumb.
  let embed
  data.allMdx.edges.map(({node}) => {
    if (get_trimmed_path(node.fields.slug) === get_trimmed_path(slug)) {
      embed = node
    }
  })
  return (
    <div className={`${styles.embed} bordered`}>
      {(
        !brief &&
        <section key={embed.id}>
          <Link to={embed.fields.slug} className={styles.title}>
            <h3>
              {embed.frontmatter.title}
            </h3>
          </Link>
          <div className="mdx">
            <MDXProvider>{children}</MDXProvider>
          </div>
        </section>
      ) || (
        brief &&
        <section key={embed.id} className={styles.brief}>
          <Link to={embed.fields.slug} className={styles.title}>
            <h3>
              <i className="fa fa-link"></i>
              &nbsp;
              {embed.frontmatter.title}
            </h3>
          </Link>
        </section>
      )}
    </div>
  )
}

Embed.propTypes = {
  slug: PropTypes.string.isRequired,
}

export default Embed
