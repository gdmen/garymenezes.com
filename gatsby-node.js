const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "Mdx") {
    const fileNode = getNode(node.parent)
    const slug = createFilePath({ node, getNode })
    const splitSlug = slug.split("/").filter(i => i)
    let type = "page"
    if (splitSlug[0] === "blog") {
      type = "post"
    } else if (splitSlug[0] === "about") {
      type = "about"
      if (splitSlug[1] === "employment") {
        type = "employment"
      }
    } else if (splitSlug[0] === "notes") {
      type = "note"
      createNodeField({
        node,
        name: `book`,
        value: splitSlug[1],
      })
      if (splitSlug.length === 2) {
        type = "book"
      }
    } else if (splitSlug[0] === "assets") {
      if (splitSlug[1] === "people") {
        type = "person"
      }
    }
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    createNodeField({
      node,
      name: `type`,
      value: type,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
              type
              book
            }
          }
        }
      }
    }
  `)
  const edges = result.data.allMdx.edges
  const pages = edges.filter(e => e.node.fields.type === "page")
  const posts = edges.filter(e => e.node.fields.type === "post")
  const notes = edges.filter(e => ["note", "book"].includes(e.node.fields.type))
  pages.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/page.js"),
      context: {
        slug: node.fields.slug,
      },
    })
  })
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/post.js"),
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
        book: node.fields.book,
      },
    })
  })
}
