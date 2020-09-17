import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import EmploymentBlock from "../components/employment_block"

import styles from "./about.module.css"

export default function About({ data }) {
  return (
    <Layout page="about">
      <section>
        <ul className={styles.employment_list}>
          {data.allMdx.edges.map(({ node }) => (
            <li key={node.id}>
              <EmploymentBlock
                company={node.frontmatter.company}
                image={node.frontmatter.image}
                title={node.frontmatter.title}
                loc={node.frontmatter.loc}
                start={node.frontmatter.start}
                end={node.frontmatter.end}
                body={node.body}
              ></EmploymentBlock>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___start], order: DESC }
      filter: { fields: { type: { eq: "employment" } } }
    ) {
      totalCount
      edges {
        node {
          id
          body
          frontmatter {
            company
            image {
              childImageSharp {
                fixed(height: 64, quality: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            title
            loc
            start(formatString: "MMMM D, YYYY")
            end(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  }
`
