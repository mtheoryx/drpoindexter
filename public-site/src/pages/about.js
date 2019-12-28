import React from "react"
import Helmet from "react-helmet"
import Layout from "../components/layout"

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

    <h2>A Career Change, Hard Work, and a Bit of Luck</h2>

    <p>
      After quite a large career change, I returned to university, and
      immediately got a Student Hourly position at my school. I was doing mostly
      media production and working on distributed education technologies.
    </p>

    <p>
      I moved into custom app development, and eventually was offered a
      Proffessional Staff position at my univeristy. I've since moved to several
      kinds of opportunities in public secter including financial, educational,
      and medical industries.
    </p>

    <h3>Currently Working: In Consulting</h3>

    <p>
      I'm currently an AWS Cloud Architect, senior consultant, and Practice Lead
      at{" "}
      <a
        href="https://www.cleanslatetg.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Cleanslate Technology Group
      </a>
      . It's my first experience with consulting, and it's quite exciting and
      motivating to me.
    </p>

    <p>
      Learning particular frustrations, goals, and limitations of a particular
      client's problem space, and then having the freedom to recommend unique
      solutions can be extremely rewarding when you do ship the solution, and
      see the client's delight at the results.
    </p>

    <h3>Currently Sharing: On Twitch</h3>

    <p>
      Particular technology I'm interested in now include Gatsby, React,
      Graphql, AWS Amplify, and serverless technologies. I'm in IoT and
      automation, particularly around sustainability, home and work automation,
      and realtime interactions.
    </p>

    <p>
      I started watching tech streamers on twitch years ago, and eventually
      built many relationships. At some point I was a moderator on several
      streams, helping build up communities, promote inclusiveness, and help new
      people.
    </p>

    <p>
      One day, December 27th, 2018 after the support from many others, I clicked
      that GO LIVE button. In a whirlwind of getting my bearings, figuring out a
      schedule, learning how to interact with a new audience, I essentially was
      able to speed-run the requirements for Twitch Affiliate.
    </p>

    <p>
      Since then we have added Silicon Saturdays to the lineup, established an
      active and inclusive discord community, done charity fundraising events,
      and helped build up many other streamers to achieve their own community
      goals.
    </p>
  </Layout>
)

export default IndexPage
