import React from "react"
import styled from "styled-components"

const StyledFooter = styled.footer`
  a {
    margin-right: 3px;
  }
  a:not(:first-child) {
    margin-right: 0;
  }
  .essential2,
  .essential3 {
    display: none;
  }
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;

  @media (min-width: 550px) {
    justify-content: space-between;
    .essential2 {
      display: inline;
    }
  }

  @media (min-width: 800px) {
    justify-content: space-between;
    .essential2,
    .essential3 {
      display: inline;
    }
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <span className="essential1">
        <a
          href="https://media.giphy.com/media/PJoLp4gDIqjYs/giphy.gif"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#663399" }}
        >
          © {new Date().getFullYear()}
        </a>
        <a
          href="https://www.dpoindexter.com/"
          style={{ color: "#663399" }}
          rel="noopener noreferrer"
        >
          David Poindexter
        </a>
      </span>

      <a
        href="https://www.gatsbyjs.org"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#663399" }}
        className="essential2"
      >
        Built with Gatsby
      </a>
      <a
        href="https://www.gatsbyjs.org/docs/winning-over-developers/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#663399" }}
        className="essential3"
      >
        My Website is Faster than Yours!
      </a>
      <a
        href="https://aws.amazon.com/amplify/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#663399" }}
        className="essential2"
      >
        AWS Amplify
      </a>
    </StyledFooter>
  )
}

export default Footer
