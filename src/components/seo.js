import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ title, children }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          description
          title
          siteUrl
        }
      }
    }
  `)

  title = title || site.siteMetadata.title
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={site.siteMetadata.description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={site.siteMetadata.description} />
      {children}
    </>
  )
}

Seo.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Seo
