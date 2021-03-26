/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Mikkes blogg",
    author: "Mikke",
    description: "Blogg",
    siteUrl: "https://www.mikkesblogg.no"
  },
  plugins: [
    "gatsby-plugin-smoothscroll",
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
              withWebp: true,
              loading: "lazy",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          
                    allSitePage {
                      nodes {
                        path
                      }
                    }
        }`,
        resolveSiteUrl: ({site, allSitePage}) => {
          //Alternatively, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
          return site.siteMetadata.siteUrl
        },
        serialize: ({ site, allSitePage }) =>
          allSitePage.nodes.map(node => {
            if (node.path.startsWith("/blogg")) {
              return {
                url: `${site.siteMetadata.siteUrl}${node.path}`,
                changefreq: `never`,
                priority: 0.5,
              }
            }
            else {
              return {
                url: `${site.siteMetadata.siteUrl}${node.path}`,
                changefreq: `weekly`,
                priority: 0.7,
              }
            }
          })
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.mikkesblogg.no',
        sitemap: 'https://www.mikkesblogg.no/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    "gatsby-plugin-react-helmet",
  {
    resolve: "gatsby-source-contentful",
    options: {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    }
  },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        // Defaults used for gatsbyImageData and StaticImage
        defaults: {},
        // Set to false to allow builds to continue on image errors
        failOnError: true,
        // deprecated options and their defaults:
        base64Width: 20,
        forceBase64Format: `webp`, // valid formats: png,jpg,webp
        useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
        stripMetadata: true,
        defaultQuality: 50,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: "gatsby-remark-images",
            options: {
              offsetY: `100`,
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              className: `custom-class`,
              maintainCase: true,
              removeAccents: true,
              isIconAfterHeader: true,
              elements: [`h1`, `h4`],
            },
            options: {
              maxWidth: 750,
              quality: 1,
              linkImagesToOriginal: false
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (eg for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: "language-",
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in src/layouts/index.js
              // right after importing the prism color scheme:
              //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-plugin-breadcrumb`,
            options: {
              useAutoGen: true,
            }
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
          name: 'pages',
          engine: 'flexsearch',
          query: `query {
            allContentfulBlogginnlegg (
              sort: {
                fields:publishedDate,
                order: DESC
              }
            ) { 
              edges { 
                node { 
                   title
                   slug
                   category {categoryName}
                   publishedDate (formatString:"DD.MM.YY, ")
              }
            }
          }
          }`,
          ref: 'slug',
          index: ['title'],
          store: ['title', 'slug', 'category', 'publishedDate'],
          normalizer: ({ data }) =>
          data.allContentfulBlogginnlegg.edges.map(nodes => ({
              title: nodes.node.title,
              slug: nodes.node.slug,
              category: nodes.node.category,
              publishedDate: nodes.node.publishedDate
          })),
      }
  }
  ],
}
