/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import Header from "./siteHeader"
import Footer from "./footer"
import GlobalStyle from "./globalStyle.js"
import Seo from "./seo"

const Layout = ({ children }) => {
  return (
    <>
      <Seo />
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Faustina:wght@400;700&family=Roboto&family=Roboto+Slab:wght@700&display=swap" rel="stylesheet"/>
      </Helmet>
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
