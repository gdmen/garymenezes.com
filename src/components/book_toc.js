import React from "react"
import { Link } from "gatsby"

import styles from "./book_toc.module.css"

export default function BookTOC({ edges }) {
  return (
    <div className={styles.toc}>
      {edges.map(({ node }) => (
        <div className={styles.note} key={node.id}>
          <Link className={styles.link} to={node.fields.slug}>
            {node.frontmatter.number !== 0 && node.frontmatter.number + "."}{" "}
            {node.frontmatter.title}
          </Link>
        </div>
      ))}
    </div>
  )
}
