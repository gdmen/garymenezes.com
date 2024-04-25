import React from "react"
import PropTypes from "prop-types"

import * as styles from "./video.module.css"

const Video = ({ src, title }) => (
  <video className={styles.video} controls>
    <source src={src} type="video/mp4" />
  </video>
)

Video.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
}

Video.defaultProps = {
  title: "",
}

export default Video
