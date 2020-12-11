import React from "react"
import PropTypes from "prop-types"

import LinkOut from "./link_out"

let works = new Map([["clrs", "Introduction to Algorithms Second Edition"]])

const Citation = ({ title, text }) => {
  text = text !== undefined ? ", " + text : text
  title = works.has(title) ? (
    works.get(title)
  ) : (
    <LinkOut to={title}>{title}</LinkOut>
  )
  return (
    <footer>
      &mdash; <cite>{title}</cite>
      {text}
    </footer>
  )
}

Citation.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Citation
