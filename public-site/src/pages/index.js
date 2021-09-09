import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Hero from "../components/hero"

const IndexPage = ({ data }) => (
  <Layout>
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title="Home | David Poindexter"
      meta={[
        {
          name: "description",
          content: "Technology educational resources site for David Poindexter",
        },
      ]}
    />
    <Hero theme="light" />
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    profile: file(relativePath: { eq: "profile-image.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 277) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
