import React from "react"
import { MDXProvider } from "@mdx-js/react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "./header"
import SEO from "./seo"
import Citation from "./citation"
import Solution from "./solution"

import "./layout.css"

const shortcodes = {
  Link,
  SEO,
  Citation,
  Solution,
}

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header title={data.site.siteMetadata.title} />
      <div>
        <main className="mdx">
          {" "}
          <MDXProvider components={shortcodes}> {children} </MDXProvider>{" "}
        </main>{" "}
        <footer> ©{new Date().getFullYear()} </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
