import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import styles from "./bjj_lesson_plans_table.module.css"

const BjjLessonPlansTable = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        sort: {
          fields: [frontmatter___date]
          order: [DESC]
        }
        filter: {
          frontmatter: {
            draft: { ne: true }
            type: { eq: "note" }
            book: { eq: "bjjlessonplans" }
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
              date
              location
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
          <th>Date</th>
          <th>Title</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
      {data.allMdx.edges.map(({ node }) => (
        <tr key={node.id} className={styles.row}>
          <td className={styles.date}>
            <Link to={node.fields.slug}>{node.frontmatter.date}</Link>
          </td>
          <td className={styles.title}>
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          </td>
          <td className={styles.location}>
            <Link to={node.fields.slug}>{node.frontmatter.location}</Link>
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default BjjLessonPlansTable
