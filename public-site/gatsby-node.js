const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  let relativePath
  if (node.internal.type === `MarkdownRemark`) {
    if (node.fileAbsolutePath.includes("/devtips/")) {
      relativeFilePath = createFilePath({
        node,
        getNode,
        basePath: "devtips/",
      })
      createNodeField({
        node,
        name: `slug`,
        value: `/devtips${relativeFilePath}`,
      })
    } else if (node.fileAbsolutePath.includes("/notes/")) {
      relativeFilePath = createFilePath({
        node,
        getNode,
        basePath: "notes/",
      })
      // slug = createFilePath({ node, getNode })
      createNodeField({
        node,
        name: `slug`,
        value: `/notes${relativeFilePath}`,
      })
    }
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  // @TODO: Handle a few one-off redirects from early posting days
  // This fails badly right now
  // createRedirect({
  //   fromPath: "/devtips/purge-node-modules-from-disks/",
  //   toPath: "/notes/purge-node-modules-from-disks/",
  //   // isPermanent: true,
  //   redirectInBrowser: true,
  //   force: true,
  // })
  // createRedirect({
  //   fromPath: "/devtips/aws-cert/",
  //   toPath: "/notes/aws-cert/",
  //   // isPermanent: true,
  //   redirectInBrowser: true,
  //   force: true,
  // })
  return graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fileAbsolutePath
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      // Create the devtips pages
      if (
        node.fileAbsolutePath &&
        node.fileAbsolutePath.includes("/devtips/")
      ) {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/devtip.js`),
          context: {
            slug: node.fields.slug,
          },
        })
      }

      // Create the notes pages
      if (node.fileAbsolutePath && node.fileAbsolutePath.includes("/notes/")) {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/note.js`),
          context: {
            slug: node.fields.slug,
          },
        })
      }
    })
  })
}
