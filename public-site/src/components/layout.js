/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "./header"
import GlobalStyle from "./globalStyle.js"

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          navLinks {
            name
            link
            published
          }
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyle />
      <Header
        siteTitle={data.site.siteMetadata.title}
        navLinks={data.site.siteMetadata.navLinks}
      />
      <Container>
        <main>{children}</main>
        <hr />
        <footer>
          <a
            href="https://media.giphy.com/media/PJoLp4gDIqjYs/giphy.gif"
            target="_blank"
            style={{ color: "#663399" }}
          >
            © {new Date().getFullYear()}
          </a>{" "}
          <a href="https://www.dpoindexter.com/" style={{ color: "#663399" }}>
            David Poindexter
          </a>{" "}
          |{` `}
          <a
            href="https://www.gatsbyjs.org"
            target="_blank"
            style={{ color: "#663399" }}
          >
            Built with Gatsby
          </a>{" "}
          |{" "}
          <a
            href="https://www.gatsbyjs.org/docs/winning-over-developers/"
            target="_blank"
            style={{ color: "#663399" }}
          >
            My Website is Faster than Yours!
          </a>{" "}
          |{" "}
          <a
            href="https://aws.amazon.com/amplify/"
            target="_blank"
            style={{ color: "#663399" }}
          >
            Deployed on AWS Amplify
          </a>
        </footer>
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
