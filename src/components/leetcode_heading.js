import React from "react"
import PropTypes from "prop-types"

import LinkOut from "./link_out"

import styles from "./leetcode_heading.module.css"

const difficultyText = { 0: "easy", 1: "medium", 2: "hard" }

const LeetCodeHeading = ({ date, difficulty, number, title, url }) => (
  <div className={styles.heading}>
    <h3 className={styles.title}>
      LeetCode {number}. {title}
    </h3>
    <span className={styles.date}>
      <i className="far fa-clock"></i>
      {date}
    </span>
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
    <span className={styles.link}>
      <i className="fas fa-external-link-alt"></i>
      <LinkOut to={url}>This problem on LeetCode</LinkOut>
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

export default LeetCodeHeading
