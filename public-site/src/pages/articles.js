import React from "react"
import Helmet from "react-helmet"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  margin-top: 30px;
`

const ArticlesIndexPage = ({ data }) => (
  <Layout>
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title="Articles | David Poindexter"
      meta={[
        {
          name: "description",
          content: "Development Tips and Tricks on David Poindexter site",
        },
      ]}
    />
    <Container>
      <h2>Digital Garden Nearing Harvest</h2>

      <ul style={{ listStyle: "none" }}>
        {data.Articles.nodes.map((node) => (
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
    </Container>
  </Layout>
)

export default ArticlesIndexPage

export const pageQuery = graphql`
  query {
    Articles: allMdx(
      filter: { fileAbsolutePath: { regex: "/articles/" } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
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
`
