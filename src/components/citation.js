import React from "react"
import PropTypes from "prop-types"

let works = new Map([
  ["", "missing title"],
  ["clrs", "Introduction to Algorithms Second Edition"],
])

const Citation = ({ title, text }) => (
  <footer>
    <cite>&mdash; {works.get(title)}</cite>, {text}
  </footer>
)

Citation.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Citation
