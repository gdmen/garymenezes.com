import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import EmploymentBlock from "../components/employment_block"
import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "./about.module.css"

export default function About({ data }) {
  const gary = data.gary.edges[0].node
  return (
    <Layout page="about">
      <SEO title="about" />
      <div className="readable">
        <section>
          <h2 className={styles.about_title}>ABOUT ME</h2>
          <div className={`mdx ${styles.about_content}`}>
            <MDXRenderer frontmatter={gary.frontmatter}>
              {gary.body}
            </MDXRenderer>
          </div>
        </section>
        <section>
          <ul className={styles.employment_list}>
            {data.employment.edges.map(({ node }) => (
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
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    gary: allMdx(
      filter: {
        frontmatter: {
          draft: { ne: true }
          type: { eq: "person" }
          name: { eq: "Gary Menezes" }
        }
      }
    ) {
      edges {
        node {
          body
          frontmatter {
            linkedin
            github
          }
        }
      }
    }
    employment: allMdx(
      sort: { fields: [frontmatter___start], order: DESC }
      filter: {
        frontmatter: { draft: { ne: true }, type: { eq: "employment" } }
      }
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
