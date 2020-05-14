const path = require("path");

// module.exports.onCreateNode = ({ node, actions }) => {
//     const { createNodeField } = actions

//     if (node.internal.type === "MarkdownRemark") {
//         const slug = path.basename(node.fileAbsolutePath, ".md")
        
//         createNodeField({
//             node,
//             name: "slug",
//             value: slug
//         })
//     }

// }

module.exports.createPages = async ({ graphql, actions}) => {
    const { createPage } = actions;
    const blogTemplate = path.resolve("./src/templates/blog.js");
    const codeTemplate = path.resolve("./src/templates/coding-log.js");
    const blogCategoryLayout = path.resolve("./src/templates/blog-category.js");
    const blogListLayout = path.resolve(`./src/templates/blog-list.js`);

    
    const res = await graphql(`
        query {
            allContentfulBlogPost {
                edges {
                    node {
                        slug
                        category {categoryName}
                    }
                }
            }
        }
    `)

    const code = await graphql(`
        query {
            allContentfulCodingLog {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
    `)

    const test = await graphql(`
    query {
        allContentfulCodingLog (
            limit: 1000
        ) {
            edges {
                node {
                    slug
                }
            }
        }
    }
`)

    res.data.allContentfulBlogPost.edges.forEach((edge) => {
        createPage({
            component: blogTemplate,
            path: `/blog/${edge.node.slug}`,
            context: {
                slug: edge.node.slug
            }
        })
    })

    code.data.allContentfulCodingLog.edges.forEach((edge) => {
        createPage({
            component: codeTemplate,
            path: `/coding_log/${edge.node.slug}`,
            context: {
                slug: edge.node.slug
            }
        })
    })


    const postsPerPage = 9;
    const posts = test.data.allContentfulCodingLog.edges;
    const postsWithoutFeatured = posts;
    const numPages = Math.ceil(postsWithoutFeatured.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/blogger` : `/blogger/page/${i + 1}`,
          component: blogListLayout,
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1,
            numPages,
          },
        })
      })

}

