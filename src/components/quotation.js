import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import PropTypes from "prop-types"

import LinkOut from "./link_out"

import * as styles from "./quotation.module.css"

const Quotation = ({ children, author, context, highlight }) => {
  const people = useStaticQuery(graphql`{
  allMdx(filter: {frontmatter: {draft: {ne: true}, type: {eq: "person"}}}) {
    edges {
      node {
        id
        frontmatter {
          name
          title
          linkedin
          image {
            childImageSharp {
              gatsbyImageData(width: 200, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
}`)
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
      {authorObj.name && (
        <div className={styles.author}>
          <div className={styles.headshot}>
            {authorObj.image && (
              <GatsbyImage
                image={authorObj.image.childImageSharp.gatsbyImageData}
                className={styles.image}
                alt={`A photo of ${authorObj.name}`} />
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
      )}
      <div className={styles.content}>
        <div className={styles.text}>
          {<i className="fas fa-quote-left"></i>}
          {children}
          {<i className="fas fa-quote-right"></i>}
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
  );
}

Quotation.propTypes = {
  children: PropTypes.node.isRequired,
  author: PropTypes.string,
  context: PropTypes.string,
  highlight: PropTypes.bool,
}

Quotation.defaultProps = {
  author: null,
  context: "",
  highlight: false,
}

export default Quotation
