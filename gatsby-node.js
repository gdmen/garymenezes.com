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
  const templates = {
    post: "post",
    note: "note",
    book: "page",
  }
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
              type
            }
          }
        }
      }
    }
  `)
  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(
        "./src/templates/" + templates[node.fields.type] + ".js"
      ),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
