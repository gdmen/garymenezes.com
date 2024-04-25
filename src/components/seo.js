/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  // Short circuit to remove google analytics & to add do not scrape
  return (
    <div
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: "robots",
          content: "noindex",
        },
      ]}
    >
    </div>
  )
}

Seo.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Seo
