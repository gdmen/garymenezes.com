import React from "react"
import PropTypes from "prop-types"

import LinkOut from "./link_out"

import * as styles from "./leetcode_heading.module.css"

const LeetCodeHeading = ({ difficulty, url }) => (
  <div className={styles.heading}>
    <span className={styles.difficulty}>
      <span
        className={
          difficulty === 'easy'
            ? styles.easy
            : difficulty === 'medium'
            ? styles.medium
            : styles.hard
        }
      >
        {difficulty}
      </span>
    </span>
    <span className={styles.link}>
      <i className="fas fa-external-link-alt"></i>
      <LinkOut to={url}>LeetCode</LinkOut>
    </span>
  </div>
)

LeetCodeHeading.propTypes = {
  difficulty: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default LeetCodeHeading
