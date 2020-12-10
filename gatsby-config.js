const remarkMath = require(`remark-math`)

module.exports = {
  siteMetadata: {
    author: `Gary`,
    description: `Where Gary writes things he wants people to know about.`,
    menu: [`blog`, `notes`, `projects`, `about`],
    title: `Gary Menezes`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
        ignore: [`**/\.*`, `**/*~`], // ignore files starting with a dot or ending with a ~
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/layout.js"),
        },
        gatsbyRemarkPlugins: [
          `gatsby-remark-katex`,
          `gatsby-remark-embed-snippet`,
          `gatsby-remark-embed-video`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              maxWidth: 1200,
              showCaptions: true,
            },
          },
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
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Karla`],
      },
    },
    {
      resolve: "gatsby-plugin-htaccess",
      options: {
        https: true,
        ErrorDocument: `
          ErrorDocument 404 /404.html
          ErrorDocument 403 /404.html
        `,
      },
    },
  ],
}
