import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

import * as styles from "./note.module.css"

export const Head = ({ data }) => {
  const node = data.mdx
  return (
    <Seo title={node.frontmatter.title} />
  )
}

export default function Note({ data, location, children }) {
  const node = data.mdx
  return (
    <Layout path={location.pathname}>
      <div className="readable">
        <article className={styles.note}>
          <div className={styles.heading}>
            <h1 className={styles.title}>{node.frontmatter.title}</h1>
            <span className={styles.date}>{node.frontmatter.date}</span>
          </div>
          <div className="mdx">
            {children}
          </div>
        </article>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`
