import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { MDXProvider } from "@mdx-js/react"

import * as styles from "./employment_block.module.css"

const EmploymentBlock = ({ pathname, company, title, loc, start, end, image, children } ) => {
  const data = useStaticQuery(graphql`
    query {
      allFile (
        filter: {
          extension: { in: ["bmp","gif","ico","jpeg","jpg","raw","tiff","tif","svg","png","webp","heic","heif"] }
        }
      ) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData(
                height: 64
                quality: 75
                layout: CONSTRAINED
              )
            }
          }
        }
      }
    }
  `)
  image = pathname.replace(/^\/+/, '') + image
  let gatsbyImage
  data.allFile.edges.forEach(({node}) => {
    if (node.relativePath === image) {
      gatsbyImage = getImage(node)
    }
  })
  return (
    <div id={company.replace(/\s+/g, "")} className={styles.employment}>
      <div className={styles.heading}>
        <div className={styles.htop}>
          <span className={styles.line}></span>
          {image !== null ? (
            <GatsbyImage
              image={gatsbyImage}
              className={styles.image}
              alt={company} />
          ) : (
            <h2 className={styles.image}>{company}</h2>
          )}
          <span className={styles.line}></span>
        </div>
        <span className={styles.subtitle}>
          {title && <span className={styles.title}>{title}</span>}
          <span className={styles.dates}>
            {start} - {end ? end : "?"}
          </span>
        </span>
      </div>
      <div className="mdx">
        <MDXProvider>{children}</MDXProvider>
      </div>
    </div>
  )
}

EmploymentBlock.propTypes = {
  pathname: PropTypes.string,
  company: PropTypes.string.isRequired,
  title: PropTypes.string,
  loc: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string,
  image: PropTypes.string,
}

EmploymentBlock.defaultTypes = {
  image: null,
}

export default EmploymentBlock
