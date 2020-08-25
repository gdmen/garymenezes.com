const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  const templates = {
    blog: "post",
    notes: "note",
  }
  if (node.internal.type === "Mdx") {
    const fileNode = getNode(node.parent)
    const slug = createFilePath({ node, getNode })
    const template = templates[slug.split("/")[1]]
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    createNodeField({
      node,
      name: `template`,
      value: template,
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
              template
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
        "./src/templates/" + node.fields.template + ".js"
      ),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}
