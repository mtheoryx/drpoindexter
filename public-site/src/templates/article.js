import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BackToListNav from "../components/backToListNav/backToListNav"

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  margin-top: 30px;
`

const ArticleDetailTemplate = ({ data }) => (
  <Layout>
    <Seo
      title={data.mdx.frontmatter.title}
      description={data.mdx.frontmatter.description}
    />
    <BackToListNav destination="/articles/" name="Back to articles" />
    <Container>
      <h1>{data.mdx.frontmatter.title}</h1>
      <p>{data.mdx.frontmatter.date}</p>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </Container>
  </Layout>
)

export default ArticleDetailTemplate

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
