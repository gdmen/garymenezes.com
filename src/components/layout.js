import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"

import { MDXProvider } from "@mdx-js/react"

import Citation from "./citation"
import LeetCodeHeading from "./leetcode_title"

import "./layout.css"

const mdx_shortcodess = {
  Citation,
  LeetCodeHeading,
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
      <header>
        <div
          className="header-content"
          style={{
            margin: "0 auto",
            maxWidth: "var(--page-max-width)",
            overflow: "auto",
          }}
        >
          <Link
            to="/"
            style={{
              color: "var(--primary-color)",
              float: "left",
              fontSize: "3em",
              height: "100%",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                display: "inline-block",
              }}
            >
              {data.site.siteMetadata.title}
            </span>
          </Link>
          <div
            style={{
              float: "right",
            }}
          >
            {data.site.siteMetadata.menu.map(link => (
              <Link
                key={link}
                to={"/" + link}
                style={{
                  color: "var(--primary-color)",
                  margin: "0 1em",
                  textDecoration: "none",
                }}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </header>
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
