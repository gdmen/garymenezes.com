import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"

import { MDXProvider } from "@mdx-js/react"

import Header from "./header"

import Citation from "./citation"
import LeetCodeHeading from "./leetcode_heading"
import LeetCodeTable from "./leetcode_table"

import "./layout.css"

const mdx_shortcodess = {
  Citation,
  LeetCodeHeading,
  LeetCodeTable,
  Link,
}

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          menu
          title
        }
      }
    }
  `)
  return (
    <>
      <Header metadata={data.site.siteMetadata} />
      <main>
        <MDXProvider components={mdx_shortcodess}>{children}</MDXProvider>
      </main>
    </>
  )
  //<footer> ©{new Date().getFullYear()} </footer>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
