/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Header from "./siteHeader"
import Footer from "./footer"
import GlobalStyle from "./globalStyle.js"
import SEO from "./seo"

const Layout = ({ children }) => {
  return (
    <>
      <SEO />
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
