import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BackToListNav from "../components/backToListNav/backToListNav"

const DevtipsDetailTemplate = ({ data }) => (
  <Layout>
    <SEO
      title={data.mdx.frontmatter.title}
      description={data.mdx.frontmatter.description}
    />
    <BackToListNav destination="/devtips/" name="Back to devtips" />
    <h1>{data.mdx.frontmatter.title}</h1>
    <p>{data.mdx.frontmatter.date}</p>
    <MDXRenderer>{data.mdx.body}</MDXRenderer>
  </Layout>
)

export default DevtipsDetailTemplate

export const query = graphql`
  query($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        date(formatString: "ll")
        description
        title
      }
    }
  }
`
