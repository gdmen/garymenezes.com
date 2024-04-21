import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import styles from "./header.module.css"

const Header = ({ page, metadata }) => {
  return (
    <header className={styles.header}>
      <div className={`${styles.content} readable`}>
        <Link to="/" className={styles.title}>
          {metadata.title}
        </Link>
        <div className={styles.menu}>
          <div className={styles.links}>
            {metadata.menu.map(link => (
              <Link
                key={link}
                to={"/" + link}
                className={`${styles.link} ${page === link && styles.selected}`}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  page: PropTypes.string,
  metadata: PropTypes.object.isRequired,
}

Header.defaultProps = {
  page: "",
}

export default Header
