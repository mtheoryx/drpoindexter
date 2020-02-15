import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BackToListNav from "../components/backToListNav/backToListNav"

const DevtipsDetailTemplate = ({ data }) => (
  <Layout>
    <SEO title={data.markdownRemark.frontmatter.title} />
    <BackToListNav destination="/notes/" name="Back to notes" />
    <h1>{data.markdownRemark.frontmatter.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
  </Layout>
)

export default DevtipsDetailTemplate

export const query = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
