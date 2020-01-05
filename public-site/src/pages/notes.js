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
      title="Notes | David Poindexter"
      meta={[
        {
          name: "description",
          content:
            "Notes and scratchpad for potential David Poindexter site content",
        },
      ]}
    />
    <h2>Notes</h2>

    <ul style={{ listStyle: "none" }}>
      {data.Notes.edges.map(({ node }) => (
        <li
          key={node.id}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "3px",
          }}
        >
          <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export default DevtipsIndexPage

export const pageQuery = graphql`
  query {
    Notes: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/notes/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
