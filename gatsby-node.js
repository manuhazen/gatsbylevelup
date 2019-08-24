/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const postLayoutComponent = path.resolve("./src/components/postlayout.js")
  const resultQuery = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            excerpt
            frontmatter {
              title
              slug
              date
            }
          }
        }
      }
    }
  `)

  if (resultQuery.errors) {
    throw resultQuery.errors
  }

  resultQuery.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `${node.frontmatter.slug}`,
      component: postLayoutComponent,
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}
