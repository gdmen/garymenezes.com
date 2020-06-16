import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ title }) => (
  <header
    style={{
      backgroundColor: "var(--header-bg-color)",
      fontFamily: "var(--header-font-family)",
      padding: "0.5em",
    }}
  >
    <div className="header-content">
      <Link
        to="/"
        style={{
          color: "var(--header-color)",
          fontSize: "1.5em",
          fontVariant: "small-caps",
          textDecoration: "none",
        }}
      >
        {title}
      </Link>
    </div>
  </header>
)

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  title: ``,
}

export default Header
