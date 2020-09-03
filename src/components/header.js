import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import styles from "./header.module.css"

const Header = ({ metadata }) => {
  return (
    <header>
      <div className={styles.content}>
        <Link to="/" className={styles.title}>
          {metadata.title}
        </Link>
        <div className={styles.menu}>
          {metadata.menu.map(link => (
            <Link key={link} to={"/" + link} className={styles.link}>
              {link}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Header
