import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BackToListNav from "../components/backToListNav/backToListNav"

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  margin-top: 30px;
`

const NoteDetailTemplate = ({ data }) => (
  <Layout>
    <SEO title={data.mdx.frontmatter.title} />
    <BackToListNav destination="/garden/" name="Back to garden" />
    <Container>
      <h1>{data.mdx.frontmatter.title}</h1>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </Container>
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
