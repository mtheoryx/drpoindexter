const path = require("path")
const fs = require("fs")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    if (node.fileAbsolutePath.includes("/articles/")) {
      relativeFilePath = createFilePath({
        node,
        getNode,
        basePath: "articles/",
      })
      createNodeField({
        node,
        name: `slug`,
        value: `/articles${relativeFilePath}`,
      })
    } else if (node.fileAbsolutePath.includes("/garden/")) {
      // create printer nodes only on MD nodes that are content pieces
      relativeFilePath = createFilePath({
        node,
        getNode,
        basePath: "garden/",
      })
      createNodeField({
        node,
        name: `slug`,
        value: `/garden${relativeFilePath}`,
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
      // Create the articles pages
      if (
        node.fileAbsolutePath &&
        node.fileAbsolutePath.includes("/articles/")
      ) {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/article.js`),
          context: {
            slug: node.fields.slug,
          },
        })
      }

      if (node.fileAbsolutePath && node.fileAbsolutePath.includes("/garden/")) {
        // Create the garden pages
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
