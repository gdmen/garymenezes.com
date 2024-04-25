import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

export default function PageNotFound({ location }) {
  return (
    <Layout path={location.pathname}>
      <Seo title="404" />
      <h1 style={{ "text-align": "center" }}>404</h1>
    </Layout>
  )
}
