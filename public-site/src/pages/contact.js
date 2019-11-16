import React from "react"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ContactPage = () => (
  <Layout>
    <Helmet
      title="Contact | David Poindexter"
      meta={[
        {
          name: "description",
          content: "How to contact David Poindexter",
        },
      ]}
    />
    <h2>Let's chat!</h2>

    <p>Here are some ways you can get in touch...</p>

    <ul>
      <li>
        <a href="https://twitter.com/drpoindexter" target="_blank">
          Twitter
        </a>
      </li>
      <li>
        <a href="https://github.com/mtheoryx" target="_blank">
          Github
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/drpoindexter/" target="_blank">
          LinkedIn
        </a>
      </li>
      <li>
        <a
          href="mailto:drpoindexter+inquiry@gmail.com?subject=Contact from the DRP Website&amp;body=I found your website and I'd like to say ..."
          target="_blank"
        >
          Email
        </a>
      </li>
    </ul>
  </Layout>
)

export default ContactPage
