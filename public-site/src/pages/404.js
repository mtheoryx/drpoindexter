import React from "react"
import Helmet from "react-helmet"
import Layout from "../components/layout"

const NotFoundPage = () => (
  <Layout>
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title="404: Not found"
      meta={[
        {
          name: "description",
          content: "Page not found on David Poindexter",
        },
      ]}
    />
    <h2>NOT FOUND</h2>
    <p>You just hit a route that doesn&#39;t exist... hecc.</p>
  </Layout>
)

export default NotFoundPage
