import React from "react"
import Helmet from "react-helmet"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

const DevtipsIndexPage = ({ data }) => (
  <Layout>
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title="DevTips | David Poindexter"
      meta={[
        {
          name: "description",
          content: "Development Tips and Tricks on David Poindexter site",
        },
      ]}
    />
    <h2>Developer Tips and Tricks</h2>

    <ul>
      {data.Devtips.edges.map(({ node }) => (
        <li key={node.id}>
          <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export default DevtipsIndexPage

export const pageQuery = graphql`
  query {
    Devtips: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/devtips/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            date
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
