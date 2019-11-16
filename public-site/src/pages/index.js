import React from "react"
import Helmet from "react-helmet"
import styled from "styled-components"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

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
        <Img fluid={data.profile.childImageSharp.fluid} alt="Portrait picture of David Poindexter with a sepia filter and blurred background" />
      </Side>
      <Main>
        <h2>Welcome!</h2>
        <p>
          You're here because you're looking for content. Find that in the
          navigation above!
        </p>
        <h3>What you'll find here</h3>

        <p>
          I want to share some things I've learned over a pretty long career,
          and raise discussions with the tech community at large.
        </p>

        <p>
          Topics can range from programming, Docker, and AWS to developer
          insights, navigating an employment landscape, and trends I notice in
          the industry.
        </p>

        <h3>Wait, who even are you?</h3>

        <p>
          I'm a midwestern technologist. I primarily came from media production,
          then custom app dev. After quite a while I transitioned to DevOps and
          Cloud Architecture.
        </p>
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
    profile: file(relativePath: { eq: "profile-pic.png" }) {
      childImageSharp {
        fluid(maxWidth: 460) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
