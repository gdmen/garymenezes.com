import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"

import styles from "./employment_block.module.css"

const EmploymentBlock = ({ company, title, loc, start, end, image, body }) => (
  <div id={company.replace(/\s+/g, "")} className={styles.employment}>
    <div className={styles.heading}>
      <div className={styles.htop}>
        <span className={styles.line}></span>
        {image !== null ? (
          <Img
            className={styles.image}
            alt={company}
            fixed={image.childImageSharp.fixed}
          />
        ) : (
          <h2 className={styles.image}>{company}</h2>
        )}
        <span className={styles.line}></span>
      </div>
      <span className={styles.subtitle}>
        {title && <span className={styles.title}>{title}</span>}
        <span className={styles.dates}>
          {start} - {end ? end : "?"}
        </span>
      </span>
    </div>
    <div className="mdx">
      <MDXRenderer>{body}</MDXRenderer>
    </div>
  </div>
)

EmploymentBlock.propTypes = {
  company: PropTypes.string.isRequired,
  title: PropTypes.string,
  loc: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string,
  image: PropTypes.object,
  body: PropTypes.string.isRequired,
}

EmploymentBlock.defaultTypes = {
  image: null,
}

export default EmploymentBlock
