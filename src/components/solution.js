import PropTypes from "prop-types"
import React from "react"

const Solution = ({ title, children }) => (
  <div className="solution">
    <input id="test" type="checkbox" />
    <label htmlFor="test">
      <h4 className="text">Solution</h4>
    </label>
    <div className="contents">{children}</div>
  </div>
)

Solution.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Solution
