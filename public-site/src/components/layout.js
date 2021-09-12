/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
// import { graphql } from "gatsby"
// import styled from "styled-components"
import Header from "./siteHeader"
import Footer from "./footer"
import GlobalStyle from "./globalStyle.js"

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //         navLinks {
  //           name
  //           link
  //           published
  //         }
  //       }
  //     }
  //   }
  // `)

  return (
    <>
      <GlobalStyle />
      <Header theme="light" />

      <main>{children}</main>

      <Footer theme="light" />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
