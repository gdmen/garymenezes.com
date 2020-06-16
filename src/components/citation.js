import PropTypes from "prop-types"
import React from "react"

let works = new Map([
  ["", "missing title"],
  ["CLRS", "Introduction to Algorithms Second Edition"],
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

Citation.defaultProps = {
  title: ``,
  text: ``,
}

export default Citation
