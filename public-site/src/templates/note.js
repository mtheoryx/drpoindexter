import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BackToListNav from "../components/backToListNav/backToListNav"

const NoteDetailTemplate = ({ data }) => (
  <Layout>
    <SEO title={data.mdx.frontmatter.title} />
    <BackToListNav destination="/garden/" name="Back to garden" />
    <h1>{data.mdx.frontmatter.title}</h1>
    <MDXRenderer>{data.mdx.body}</MDXRenderer>
  </Layout>
)

export default NoteDetailTemplate

export const query = graphql`
  query($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
      }
    }
  }
`
