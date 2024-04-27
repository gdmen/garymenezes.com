const path = import(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "Mdx") {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    // Add tags from file path. Attempt to order by importance.
    var tags = slug.split("/").filter((x) => x.length > 0).slice(0,-1)
    if (node?.frontmatter?.tags !== undefined) {
      tags = tags.concat(node.frontmatter.tags)
    }
    createNodeField({
      node,
      name: `tags`,
      value: tags,
    })
  }
}


exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const projectTemplate = require.resolve("./src/templates/project.js")
  const noteTemplate = require.resolve("./src/templates/note.js")
  const result = await graphql(`
    query {
      allMdx(filter: { frontmatter: { draft: { ne: true } } }) {
        edges {
          node {
            frontmatter {
              type
            }
            fields {
              slug
              tags
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const edges = result.data.allMdx.edges
  const projects = edges.filter(e => e.node.frontmatter.type === "project")
  const notes = edges.filter(e =>
    ["note", "post"].includes(e.node.frontmatter.type)
  )
  projects.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: `${projectTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        slug: node.fields.slug,
      },
    })
  })
  notes.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: `${noteTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
