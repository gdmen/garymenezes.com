import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"

import { MDXProvider } from "@mdx-js/react"

import Header from "./header"

import Citation from "./citation"
import BjjTechnique from "./bjj_technique"
import BjjLessonPlansTable from "./bjj_lesson_plans_table"
import LeetCodeHeading from "./leetcode_heading"
import LeetCodeTable from "./leetcode_table"
import LinkOut from "./link_out"
import Quotation from "./quotation"
import Video from "./video"

import "./layout.css"

const mdx_shortcodes = {
  Citation,
  BjjTechnique,
  BjjLessonPlansTable,
  LeetCodeHeading,
  LeetCodeTable,
  Link,
  LinkOut,
  Quotation,
  Video,
}

const Layout = ({ padded, page, children }) => {
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
      <main className={padded ? "padded" : ""}>
        <MDXProvider components={mdx_shortcodes}>{children}</MDXProvider>
      </main>
    </>
  )
  //<footer> ©{new Date().getFullYear()} </footer>
}

Layout.propTypes = {
  padded: PropTypes.bool,
  page: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  padded: true,
  page: "",
}

export default Layout
