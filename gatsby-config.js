const remarkMath = require(`remark-math`)

module.exports = {
  siteMetadata: {
    author: `Gary`,
    description: `Where Gary writes things he wants to remember.`,
    menu: ["blog", "notes", "experience", "projects"],
    title: `GARY MENEZES`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve("./src/components/layout.js"),
        },
        gatsbyRemarkPlugins: [
          `gatsby-remark-katex`,
          `gatsby-remark-embed-snippet`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
            },
          },
        ],
        remarkPlugins: [remarkMath],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
