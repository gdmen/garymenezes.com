import React from "react"
import { Link } from "gatsby"

export default function BookTOC({ edges }) {
  return (
    <div>
      <h4>BookTOC</h4>
      {edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
        </div>
      ))}
    </div>
  )
}
