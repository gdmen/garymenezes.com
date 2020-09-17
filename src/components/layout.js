import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"

import { MDXProvider } from "@mdx-js/react"

import Header from "./header"

import Citation from "./citation"
import Quotation from "./quotation"
import LinkOut from "./link_out"
import LeetCodeHeading from "./leetcode_heading"
import LeetCodeTable from "./leetcode_table"

import "./layout.css"

const mdx_shortcodess = {
  Citation,
  Quotation,
  LinkOut,
  LeetCodeHeading,
  LeetCodeTable,
  Link,
}

const Layout = ({ page, children }) => {
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
      <Header page={page} metadata={data.site.siteMetadata} />
      <main>
        <MDXProvider components={mdx_shortcodess}>{children}</MDXProvider>
      </main>
    </>
  )
  //<footer> ©{new Date().getFullYear()} </footer>
}

Layout.propTypes = {
  page: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  page: "",
}

export default Layout
