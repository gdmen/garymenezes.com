import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import * as styles from "./header.module.css"

const menu = {
  "home": "",
  "résumé": "resume",
}

const Header = ({ path, metadata }) => {
  path = path.replace(/^\/|\/$/g, '')
  return (
    <header className={styles.header}>
      <div className={`${styles.content} readable`}>
        <Link to="/" className={styles.title}>
          {metadata.title}
        </Link>
        <div className={styles.menu}>
          <div className={styles.links}>
            {Object.entries(menu).map(([name, link]) => (
              <Link
                key={name}
                to={"/" + link}
                className={styles.link}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  path: PropTypes.string.isRequired,
  metadata: PropTypes.object.isRequired,
}

export default Header
