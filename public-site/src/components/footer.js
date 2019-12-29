import React from "react"
// import styled from "styled-components"

const Footer = () => (
  <footer>
    <a
      href="https://media.giphy.com/media/PJoLp4gDIqjYs/giphy.gif"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#663399" }}
    >
      © {new Date().getFullYear()}
    </a>{" "}
    <a
      href="https://www.dpoindexter.com/"
      style={{ color: "#663399" }}
      rel="noopener noreferrer"
    >
      David Poindexter
    </a>{" "}
    |{` `}
    <a
      href="https://www.gatsbyjs.org"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#663399" }}
    >
      Built with Gatsby
    </a>{" "}
    |{" "}
    <a
      href="https://www.gatsbyjs.org/docs/winning-over-developers/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#663399" }}
    >
      My Website is Faster than Yours!
    </a>{" "}
    |{" "}
    <a
      href="https://aws.amazon.com/amplify/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#663399" }}
    >
      AWS Amplify
    </a>
  </footer>
)

export default Footer
