import React from "react"
import Helmet from "react-helmet"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

const GardenIndexPage = ({ data }) => (
  <Layout>
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title="Garden | David Poindexter"
      meta={[
        {
          name: "description",
          content:
            "Digital Garden, Notes, and scratchpad for potential David Poindexter site content",
        },
      ]}
    />
    <h2>Digital Garden, seeds grow here</h2>

    <ul style={{ listStyle: "none" }}>
      {data.Garden.nodes.map((node) => (
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

export default GardenIndexPage

export const pageQuery = graphql`
  query {
    Garden: allMdx(
      filter: { fileAbsolutePath: { regex: "/garden/" } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
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
`
