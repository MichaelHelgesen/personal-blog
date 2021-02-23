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

    res.data.allContentfulBlogPost.edges.forEach((edge) => {
            createPage({
                component: blogTemplate,
                path: `/blogg/${edge.node.slug}`,
                context: {
                    slug: edge.node.slug
                }
            })
    })




    const postsPerPage = 10;
    const posts = res.data.allContentfulBlogPost.edges;
    const postsWithoutFeatured = posts;
    const numPages = Math.ceil(postsWithoutFeatured.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/blogg` : `/blogg/side/${i + 1}`,
          component: blogListLayout,
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            currentPage: i + 1,
            numPages,
          },
        })
      })

      const categories = []
      posts.forEach(({ node }, index) => {
        if (node.category) {
            node.category.forEach(cat => categories.push(cat["categoryName"]))
        
            createPage({
              path: `/blogg/${node.slug}`,
              component: blogCategoryLayout,
              context: {
                slug: node.slug,
              },
            })
        }
        
      })

      const countCategories = categories.reduce((prev, curr) => {
        prev[curr] = (prev[curr] || 0) + 1
        return prev
      }, {})

      const allCategories = Object.keys(countCategories)

      allCategories.forEach((cat, i) => {
        const link = `/blogg/kategori/${cat.toLowerCase()}`
        Array.from({
          length: Math.ceil(countCategories[cat] / postsPerPage),
        }).forEach((_, i) => {
          createPage({
            path: i === 0 ? link : `${link}/side/${i + 1}`,
            component: blogCategoryLayout,
            context: {
              allCategories: allCategories,
              category: cat,
              limit: postsPerPage,
              skip: i * postsPerPage,
              currentPage: i + 1,
              numPages: Math.ceil(countCategories[cat] / postsPerPage),
            },
          })
        })
      })
}

