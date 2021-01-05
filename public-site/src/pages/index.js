import React from "react"
import Helmet from "react-helmet"
import styled from "styled-components"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { RoundImage } from "../components/profileImage"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Side = styled.div`
  display: none;
  @media screen and (min-width: 740px) {
    display: flex;
    flex-direction: column;
    width: 30%;
    margin: 0 5%;
  }
`

const Main = styled.div`
  width: 100%;
  @media screen and (min-width: 740px) {
    width: 50%;
    margin: 0 5%;
  }
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
    <Container>
      <Side>
        <RoundImage
          src={data.profile.childImageSharp.fluid}
          alt="Portrait picture of David Poindexter with a sepia filter and blurred background"
        />
      </Side>
      <Main>
        <h2>I’m David, a sofware engineer and cloud architect.</h2>
        <p>
          I specialize in <span style={{ fontWeight: 600 }}>serverless</span>{" "}
          development, cloud{" "}
          <span style={{ fontWeight: 600 }}>architecture</span> and
          implementation, and <span style={{ fontWeight: 600 }}>write</span>{" "}
          about my experiences along the way.
        </p>

        <h3>What you'll find here</h3>

        <p>
          A collection of things I learn along the way, sometimes really
          interesting, sometimes small observations. I keep collections of
          notes, a produce some more structured content in the form of devtips.
        </p>
        <ul>
          <li>Programming (mostly Node/JS)</li>
          <li>Hardware (IoT and other fun stuff)</li>
          <li>Docker! Lots of Docker</li>
          <li>AWS architecture and hands-on experience</li>
          <li>Industry observations</li>
          <li>Content and media production</li>
        </ul>

        <h3>Some Extras</h3>

        <p>
          I also stream Live Coding, IoT, and hardware 3 days a week over on{" "}
          <a
            href="https://www.twitch.tv/roberttables"
            target="_blank"
            rel="noopener noreferrer"
          >
            my Twitch community
          </a>
          , and I am one of the original members of the{" "}
          <a
            href="https://livecoders.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitch Live Coders Team
          </a>
          .
        </p>
      </Main>
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
  }
`
