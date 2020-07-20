import PropTypes from "prop-types"
import React from "react"

const Solution = ({ title, children }) => (
  <div className="solution">
    <input id={title} type="checkbox" />
    <label htmlFor={title}>
      <h4 className="text">Solution</h4>
    </label>
    <div className="contents">{children}</div>
  </div>
)

Solution.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Solution
