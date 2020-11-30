const path = require("path")
const fs = require("fs")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
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
            frontmatter {
              title
              status
            }
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

    // Create json file for alfred searching
    if (!fs.existsSync(path.join(__dirname, "public"))) {
      fs.mkdirSync(path.join(__dirname, "public"))
    }
    fs.writeFileSync(
      path.join(__dirname, "public", "posts.json"),
      JSON.stringify({
        items: result.data.allMdx.edges.map(({ node }) => {
          return {
            title: node.frontmatter.title,
            subtitle: `https://www.dpoindexter.com${node.fields.slug}`,
            arg: `https://www.dpoindexter.com${node.fields.slug}`,
          }
        }),
      })
    )
  })
}
