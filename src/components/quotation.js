import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"

import LinkOut from "./link_out"

import styles from "./quotation.module.css"

const Quotation = ({ children, author, context, highlight }) => {
  const people = useStaticQuery(graphql`
    query {
      allMdx(filter: { fields: { type: { eq: "person" } } }) {
        edges {
          node {
            id
            frontmatter {
              name
              title
              linkedin
              image {
                childImageSharp {
                  fluid(maxWidth: 200) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  let authorObj = {
    name: author,
  }
  people.allMdx.edges.forEach(edge => {
    if (edge.node.frontmatter.name === author) {
      authorObj = edge.node.frontmatter
    }
  })
  return (
    <div className={`${styles.quotation} ${highlight && styles.highlight}`}>
      <div className={styles.author}>
        <div className={styles.headshot}>
          {authorObj.image ? (
            <Img
              className={styles.image}
              fluid={authorObj.image.childImageSharp.fluid}
              alt={`A photo of ${authorObj.name}`}
            />
          ) : (
            <span className={styles.anonymous}>
              <i className={`material-icons`}>person</i>
            </span>
          )}
        </div>
        {authorObj.linkedin && (
          <div className={styles.linkedin}>
            <LinkOut to={authorObj.linkedin}>
              <span className="fa-stack">
                <i className="fas fa-circle fa-stack-1x"></i>
                <i className="fab fa-linkedin fa-stack-1x fa-inverse"></i>
              </span>
            </LinkOut>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.text}>
          {highlight && <i className="fas fa-quote-left"></i>}
          {children}
          {highlight && <i className="fas fa-quote-right"></i>}
        </div>
        <div className={styles.citation}>
          <span className={styles.context}>{context}</span>
          {authorObj.linkedin ? (
            <LinkOut to={authorObj.linkedin}>
              <span className={styles.name}>{authorObj.name}</span>
            </LinkOut>
          ) : (
            <span className={styles.name}>{authorObj.name}</span>
          )}
        </div>
      </div>
    </div>
  )
}

Quotation.propTypes = {
  children: PropTypes.node.isRequired,
  author: PropTypes.string,
  context: PropTypes.string,
  highlight: PropTypes.bool,
}

Quotation.defaultProps = {
  author: "",
  context: "",
  highlight: false,
}

export default Quotation
