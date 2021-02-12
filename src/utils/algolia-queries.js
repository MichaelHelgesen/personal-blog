const pageQuery = `{
    pages: allContentfulBlogPost {
        edges {
          node {
            id
            title
          }
        }
      }
}`

function pageToAlgoliaRecord({ node: { id, title } }) {
  return {
    objectID: id,
    ...title
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]

module.exports = queries