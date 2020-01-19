module.exports = {
  siteMetadata: {
    title: `David Poindexter`,
    description: `The online destination for all things Tech, Programming, Innovation, and Collaboration from David Poindexter.`,
    author: `@mtheoryx`,
    siteUrl: `https://www.dpoindexter.com`,
    navLinks: [
      { name: "devtips", link: "/devtips", published: true },
      { name: "notes", link: "/notes", published: true },
      { name: "work", link: "/work", published: false },
      { name: "writing", link: "/writing", published: false },
      { name: "projects", link: "/projects", published: false },
      { name: "open source", link: "/opensource", published: false },
      { name: "stream", link: "/stream", published: false },
      { name: "about", link: "/about", published: true },
      { name: "contact", link: "/contact", published: true },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `${__dirname}/src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-humans-txt`,
      options: {
        team: [
          {
            Developer: `David Poidnexter`,
            Github: `mtheoryx`,
            Twitter: `@drpoindexter`,
          },
        ],
        thanks: [`Gatsby`, `AWS Amplify`, `Node`, `React`, `VS Code`, `Docker`],
        site: {
          "Last update": `${new Date().getMonth()}/${new Date().getDate()}/${new Date().getFullYear()}`,
          Standards: `ECMAScript 6`,
          Components: `Gatsby`,
          Softwares: `VS Code`,
        },
        note: `Made in Indianapolis`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: `https://www.dpoindexter.com`,
        sitemap: `https://www.dpoindexter.com/sitemap.xml`,
        policy: [{ userAgent: "*", disallow: "" }],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `devtips`,
        path: `${__dirname}/src/devtips/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `notes`,
        path: `${__dirname}/src/notes/`,
        ignore: [`**/\.*`],
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
        icon: `src/images/ship-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-copy-relative-linked-files`,
            options: {
              ignoreFileExtensions: [".md", ".png", ".jpg", ".jpeg"],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
          },
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
