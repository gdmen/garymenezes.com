import React from "react"
import PropTypes from "prop-types"

import styles from "./leetcode_heading.module.css"

const difficultyText = { 0: "easy", 1: "medium", 2: "hard" }

const LeetCodeHeading = ({ date, difficulty, number, title, url }) => (
  <div className={styles.heading}>
    <h3 className={styles.title}>
      LeetCode {number}. {title}
      <span className={styles.difficulty}>
        <span
          className={
            difficulty === 0
              ? styles.easy
              : difficulty === 1
              ? styles.medium
              : styles.hard
          }
        >
          {difficultyText[difficulty]}
        </span>
      </span>
    </h3>
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
  difficulty: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

LeetCodeHeading.defaultProps = {
  date: ``,
  difficulty: 0,
  number: 0,
  title: ``,
  url: ``,
}

export default LeetCodeHeading
