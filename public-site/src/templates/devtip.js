import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BackToListNav from "../components/backToListNav"

const DevtipsDetailTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.markdownRemark.frontmatter.title}
      description={data.markdownRemark.frontmatter.description}
    />
    <BackToListNav destination="/devtips/" name="Back to devtips" />
    <h4>{data.markdownRemark.frontmatter.title}</h4>
    <p>{data.markdownRemark.frontmatter.date}</p>
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
  </Layout>
)

export default DevtipsDetailTemplate

export const query = graphql`
  query($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "ll")
        description
        title
      }
    }
  }
`
