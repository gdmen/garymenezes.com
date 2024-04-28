import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import * as dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const config = {
  siteMetadata: {
    author: `Gary`,
    description: `Where Gary writes things he wants people to know about.`,
    title: `Gary Menezes`,
    siteUrl: 'https://www.garymenezes.com',
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `./content`,
        ignore: [`**/\.*`, `**/*~`], // ignore files starting with a dot or ending with a ~
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          `gatsby-remark-embed-snippet`,
          `gatsby-remark-embed-video`,
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
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
        mdxOptions: {
          remarkPlugins: [
            remarkGfm,
            remarkMath
          ],
        },
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
  ],
}


export default config;
