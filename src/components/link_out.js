import React from "react"
import PropTypes from "prop-types"

const LinkOut = ({ to, children }) => (
  <a href={to} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

LinkOut.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default LinkOut
