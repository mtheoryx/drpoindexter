import React from "react"
import Helmet from "react-helmet"
import styled from "styled-components"
import Layout from "../components/layout"

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  margin-top: 30px;
`

const IndexPage = () => (
  <Layout>
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title="About | David Poindexter"
      meta={[
        {
          name: "description",
          content: "Background information about David Poindexter",
        },
      ]}
    />
    <Container>
      <h2>The basics</h2>
      <p>
        I'm a Cloud Architect at a consulting company based in the Mid-West U.S.
        I'm excited about the future of technology, humble and always eager to
        learn and teach, and look every challenge in the face and know "Well
        I've always figured it out before, why would this time be any
        different?"
      </p>
      <h2>We may have a lot in common</h2>
      <div>
        <p>There is a great opportunity to collaborate if you are:</p>
        <ul>
          <li>A new developer, seeking guidance to avoid early pitfalls</li>
          <li>
            A seasoned developer, seeking peers to hone skills and career
            choices
          </li>
          <li>An enterprise wanting a gut-check on a key decision</li>
          <li>An entrepreneur, just wanting to explore a problems space</li>
          <li>An awesome human interested in teaching or learning</li>
        </ul>
        <p>
          Is this you? Well, if you are, I can't wait to hear your stories and
          challenges!
        </p>
      </div>

      <h2>Let's Chat!</h2>
      <ul>
        <li>
          <a
            href="https://twitter.com/drpoindexter"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href="https://github.com/mtheoryx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/drpoindexter/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
      </ul>
      <h2>The boring stuff</h2>
      <h3>A Career Change, Hard Work, and a Bit of Luck</h3>

      <p>
        After quite a large career change, I returned to university, and
        immediately pursued a Student Hourly position at my school. I was
        working mostly in the media production space and developing distributed
        education technologies.
      </p>

      <p>
        I transitioned to custom application development, and was offered a
        Professional Staff position at Indiana University. I've since embraced
        several unique types of challenges in private sector including
        financial, education, and medical industries.
      </p>

      <h3>Currently Working: In Consulting</h3>

      <p>
        I'm an AWS Cloud Architect at{" "}
        <a
          href="https://www.cleanslatetg.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CleanSlate Technology Group
        </a>
        .
      </p>

      <p>
        Learning particular frustrations, goals, and limitations of a particular
        client's problem space, then having the freedom to recommend solutions
        can be extremely rewarding when you do ship the solution, and see the
        client's delight at the results.
      </p>
    </Container>
  </Layout>
)

export default IndexPage
