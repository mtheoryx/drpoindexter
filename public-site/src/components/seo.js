/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
// import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            image
            twitterUserName
            siteUrl
          }
        }
      }
    `
  )

  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={site.title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: site.metaDescription,
        },
        {
          property: `og:title`,
          content: site.title,
        },
        {
          property: `og:description`,
          content: site.metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: site.title,
        },
        {
          name: `twitter:description`,
          content: site.metaDescription,
        },
        {
          name: `twitter:image`,
          content: `${site.siteMetadata.siteUrl}${site.siteMetadata.image}`,
        },
      ]}
    />
  )
}

export default SEO
