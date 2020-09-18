const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "Mdx") {
    const fileNode = getNode(node.parent)
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx(filter: { frontmatter: { draft: { ne: true } } }) {
        edges {
          node {
            frontmatter {
              type
              book
            }
            fields {
              slug
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
  const posts = edges.filter(e => e.node.frontmatter.type === "post")
  const projects = edges.filter(e => e.node.frontmatter.type === "project")
  const notes = edges.filter(e =>
    ["note", "book"].includes(e.node.frontmatter.type)
  )
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/post.js"),
      context: {
        slug: node.fields.slug,
      },
    })
  })
  projects.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/page.js"),
      context: {
        slug: node.fields.slug,
      },
    })
  })
  notes.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/note.js"),
      context: {
        slug: node.fields.slug,
        book: node.frontmatter.book,
      },
    })
  })
}
