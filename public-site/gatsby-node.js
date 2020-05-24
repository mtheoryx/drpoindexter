const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  let fileName

  if (node.internal.type === `Mdx`) {
    if (node.fileAbsolutePath.includes("/devtips/")) {
      // create printer nodes only on MD nodes that are content pieces
      // filePathSplit = node.fileAbsolutePath.split("/")
      // fileName = filepathSplit[filePathSplit.lenght - 2]

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
      // create printer nodes only on MD nodes that are content pieces
      relativeFilePath = createFilePath({
        node,
        getNode,
        basePath: "notes/",
      })
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

  return graphql(`
    query {
      allMdx {
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
  `).then((result) => {
    result.data.allMdx.edges.forEach(({ node }) => {
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

      if (node.fileAbsolutePath && node.fileAbsolutePath.includes("/notes/")) {
        // Create the notes pages
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
