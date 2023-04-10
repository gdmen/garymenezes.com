import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import styles from "./bjj_techniques_table.module.css"

const BjjTechniquesTable = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        sort: {
          fields: [frontmatter___number]
          order: [DESC]
        }
        filter: {
          frontmatter: {
            draft: { ne: true }
            type: { eq: "note" }
            book: { eq: "bjjtechniques" }
          }
        }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              number
              title
            }
          }
        }
      }
    }
  `)
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.head}>
          <th>Title</th>
          <th>Id</th>
        </tr>
      </thead>
      <tbody>
      {data.allMdx.edges.map(({ node }) => (
        <tr key={node.id} className={styles.row}>
          <td className={styles.title}>
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          </td>
          <td className={styles.number}>
            <Link to={node.fields.slug}>{node.frontmatter.number}</Link>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default BjjTechniquesTable
