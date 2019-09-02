module.exports = {
  siteMetadata: {
    title: `David Poindexter`,
    description: `The online destination for all things Tech, Programming, Innovation, and Collaboration from David Poindexter.`,
    author: `@mtheoryx`,
    siteUrl: `https://www.dpoindexter.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-humans-txt`,
      options: {
        team: [
          {
            Developer: `David Poidnexter`,
            Github: `mtheoryx`,
            Twitter: `@mtheoryx`
          }
        ],
        thanks: [`Gatsby`, `AWS Amplify`, `Node`, `React`, `VS Code`, `Docker`],
        site: {
          'Last update': `${new Date().getMonth()}/${new Date().getDate()}/${new Date().getFullYear()}`,
          Standards: `ECMAScript 6`,
          Components: `Gatsby`,
          Softwares: `VS Code`,
        },
        note: `Made in Indianapolis`
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: `https://www.dpoindexter.com`,
        sitemap: `https://www.dpoindexter.com/sitemap.xml`,
        policy: [{ userAgent: '*', disallow: '' }]
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
