import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const DevtipsIndexPage = ({ data }) => (
  <Layout>
    <SEO
      title="Development Tips and Tricks"
      description="David Poindexter's scratchpad for development tips and tricks."
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
