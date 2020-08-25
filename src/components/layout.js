import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"

import { MDXProvider } from "@mdx-js/react"

import Citation from "./citation"
import Solution from "./solution"

import "./layout.css"

const shortcodes = {
  Citation,
  Solution,
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
      <header
        style={{
          color: "var(--primary-color)",
          fontFamily: "var(--header-font-family)",
          padding: "1em 0 3em",
        }}
      >
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
      <main
        style={{
          margin: "0 auto",
          maxWidth: "var(--page-max-width)",
        }}
      >
        <MDXProvider components={shortcodes}>{children}</MDXProvider>
      </main>
    </>
  )
  //<footer> ©{new Date().getFullYear()} </footer>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
