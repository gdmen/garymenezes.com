import React from "react"
import PropTypes from "prop-types"

const LinkOut = ({ className, to, children }) => (
  <a className={className} href={to} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

LinkOut.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

LinkOut.defaultProps = {
  className: "",
}

export default LinkOut
