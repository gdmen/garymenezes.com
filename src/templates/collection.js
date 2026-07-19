import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

import * as styles from "./collection.module.css"

export const Head = ({ pageContext }) => (
  <Seo title={`${pageContext.title} | Gary Menezes`} />
)

export default function Collection({ data, location, pageContext }) {
  const { title, dir, color, groups = [] } = pageContext
  const dirSegments = dir.split("/")
  const notes = data.allMdx.edges.map(({ node }) => node)

  const groupOf = node => groups.find(g => node.fields.tags.includes(g))
  const sections = groups
    .map(g => ({ tag: g, notes: notes.filter(n => groupOf(n) === g) }))
    .filter(s => s.notes.length > 0)
  const ungrouped = notes.filter(n => !groupOf(n))
  if (ungrouped.length > 0) {
    sections.push({ tag: sections.length > 0 ? `other` : null, notes: ungrouped })
  }

  const rowTags = node =>
    node.fields.tags.filter(t => !dirSegments.includes(t) && t !== groupOf(node))

  return (
    <Layout path={location.pathname}>
      <section className="readable">
        <div className={styles.crumb}>
          <Link to="/">home</Link> / {dirSegments.join(" / ")}
        </div>
        <div className={styles.heading}>
          <span
            className={styles.dot}
            style={{ backgroundColor: `var(--${color})` }}
          ></span>
          <h1>{title}</h1>
          <span className={styles.count}>{notes.length} notes</span>
        </div>
        <div className={`${styles.row} ${styles.headerRow}`}>
          <span className={styles.title}>title</span>
          <span className={styles.tags}>tags</span>
          <span className={styles.date}>date</span>
        </div>
        {sections.map(section => (
          <div className={styles.group} key={section.tag}>
            {section.tag && (
              <h2>
                {section.tag.replace(/-/g, " ")}
                <span className={styles.count}>{section.notes.length}</span>
              </h2>
            )}
            {section.notes.map(node => (
              <Link
                to={node.fields.slug}
                className={styles.row}
                key={node.fields.slug}
              >
                <span className={styles.title}>{node.frontmatter.title}</span>
                <span className={styles.tags}>
                  {rowTags(node).map(tag => (
                    <span className={styles[tag]} key={tag}>
                      #{tag}
                    </span>
                  ))}
                </span>
                <span className={styles.date}>{node.frontmatter.date}</span>
              </Link>
            ))}
          </div>
        ))}
      </section>
    </Layout>
  )
}

export const query = graphql`
  query ($slugRegex: String!) {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { draft: { ne: true }, type: { in: ["note", "post", "project"] } }
        fields: { slug: { regex: $slugRegex } }
      }
    ) {
      edges {
        node {
          fields {
            slug
            tags
          }
          frontmatter {
            date(formatString: "MMM YYYY")
            title
          }
        }
      }
    }
  }
`
