import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"

import { MDXProvider } from "@mdx-js/react"

import Header from "./header"

import Citation from "./citation"
import EmploymentBlock from "./employment_block"
import Embed from "./embed"
import LeetCodeHeading from "./leetcode_heading"
import LinkOut from "./link_out"
import Quotation from "./quotation"
import Video from "./video"

import "./layout.css"

const mdx_shortcodes = {
  Citation,
  EmploymentBlock,
  Embed,
  LeetCodeHeading,
  Link,
  LinkOut,
  Quotation,
  Video,
}

const Layout = ({ padded, path, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <>
      <Header path={path} metadata={data.site.siteMetadata} />
      <main className={padded ? "padded" : ""}>
        <MDXProvider components={mdx_shortcodes}>{children}</MDXProvider>
      </main>
    </>
  )
  //<footer> ©{new Date().getFullYear()} </footer>
}

Layout.propTypes = {
  padded: PropTypes.bool,
  path: PropTypes.string.isRequired,
}

Layout.defaultProps = {
  padded: true,
}

export default Layout
