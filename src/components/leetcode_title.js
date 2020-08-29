import React from "react"
import PropTypes from "prop-types"

import styles from "./leetcode_title.module.css"

const LeetCodeHeading = ({ date, title, url }) => (
  <div className={styles.heading}>
    <h3 className={styles.title}>LeetCode {title}</h3>
    <span className={styles.date}>
      <i className="material-icons">schedule</i>
      {date}
    </span>
    <span className={styles.link}>
      <i className="material-icons">open_in_new</i>
      <a href={url} target="_blank" rel="noopener noreferrer">
        This problem on LeetCode
      </a>
    </span>
  </div>
)

LeetCodeHeading.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

LeetCodeHeading.defaultProps = {
  date: ``,
  title: ``,
  url: ``,
}

export default LeetCodeHeading
