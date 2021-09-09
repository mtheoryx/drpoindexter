import React from "react"
import Helmet from "react-helmet"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Hero from "../components/hero"
import ListSummary from "../components/listSummary"

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`

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
    <Container>
      <div className="articles">
        <ListSummary
          heading={"Featured Articles"}
          theme="light"
          link={"/articles"}
        />

        <ul>
          {data.Articles.nodes.map((node) => (
            <li key={node.id}>
              <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="seeds">
        <ListSummary heading={"Garden Seeds"} theme="light" link={"/garden"} />

        <ul>
          {data.Garden.nodes.map((node) => (
            <li key={node.id}>
              <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
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
    Articles: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/articles/" }
        frontmatter: { status: { eq: "featured" } }
      }
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
    Garden: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/garden/" }
        frontmatter: { status: { eq: "featured" } }
      }
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
