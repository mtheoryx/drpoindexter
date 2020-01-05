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

    <ul style={{ listStyle: "none" }}>
      {data.Devtips.edges.map(({ node }) => (
        <li
          key={node.id}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "3px",
          }}
        >
          <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          <br />
          <br />
          <p>{node.frontmatter.description}</p>
          <Link to={node.fields.slug}>Read More &#8658;</Link>
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
