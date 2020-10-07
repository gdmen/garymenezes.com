import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import styles from "./leetcode_table.module.css"

const difficultyText = { 0: "easy", 1: "medium", 2: "hard" }

const LeetCodeTable = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        sort: {
          fields: [frontmatter___difficulty, frontmatter___number]
          order: [ASC, ASC]
        }
        filter: {
          frontmatter: {
            draft: { ne: true }
            type: { eq: "note" }
            book: { eq: "leetcode" }
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
              difficulty
              number
              title
              url
            }
          }
        }
      }
    }
  `)
  return (
    <table className={styles.table}>
      <tr className={styles.head}>
        <th>#</th>
        <th>Name</th>
        <th>Difficulty</th>
      </tr>
      {data.allMdx.edges.map(({ node }) => (
        <tr key={node.id} className={styles.row}>
          <td>{node.frontmatter.number}</td>
          <td className={styles.name}>
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          </td>
          <td>
            <span
              className={
                node.frontmatter.difficulty === 0
                  ? styles.easy
                  : node.frontmatter.difficulty === 1
                  ? styles.medium
                  : styles.hard
              }
            >
              {difficultyText[node.frontmatter.difficulty]}
            </span>
          </td>
        </tr>
      ))}
    </table>
  )
}

export default LeetCodeTable
