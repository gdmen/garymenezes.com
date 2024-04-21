const remarkMath = require(`remark-math`)

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    author: `Gary`,
    description: `Where Gary writes things he wants people to know about.`,
    menu: [`about`],
    title: `Gary Menezes`,
    siteUrl: 'https://www.garymenezes.com',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        policy: [{ userAgent: '*', disallow: ['/'] }]
      }
    },
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
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
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
        fonts: [
          `Karla\:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i`
        ],
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
    {
      resolve: '@mkitio/gatsby-theme-password-protect',
      options: {
        pagePaths: ['/climbing/journal'],
        partialMatching: true,
        password: process.env.JOURNAL_PASSWORD // delete or `undefined` to disable password protection
      }
    }
  ],
}
