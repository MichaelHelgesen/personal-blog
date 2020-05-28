import React from "react";
import { Link,  graphql } from "gatsby";
import Layout from "../components/layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Head from "../components/head";
import layoutStyles from "../components/layout.module.scss";
import Breadcrumbs from "../components/breadcrumb";
// export const query = graphql`
// query (
//     $slug: String!
//   ) {
//     markdownRemark (
//       fields: {
//         slug: {
//           eq: $slug
//         }
//       }
//     ) {
//       frontmatter {
//         title
//         date
//         }
//         html
//       }
//     }
// `

export const query = graphql`
  query ($slug: String!) {
    contentfulBlogPost(slug: {eq: $slug}) {
      title
      category {categoryName}
      publishedDate(formatString: "MMMM Do, YYYY")
      body {
        json
      }
      codeBlock2{childMarkdownRemark {html}}
    }
  }
`

const Blog = (props) => {
  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img alt={alt} src={url} />
      }
    }
  }



    return (
        <Layout>
          <Head title={props.data.contentfulBlogPost.title}/>
          <div className={layoutStyles.contentWrapper}>
          <div className={layoutStyles.contentInner}>
          <Breadcrumbs crumbs={ [ '/', 'Blog', props.data.contentfulBlogPost.title ] } />
          <h1>{props.data.contentfulBlogPost.title}</h1>
          <p className={layoutStyles.date}>{props.data.contentfulBlogPost.publishedDate} {props.data.contentfulBlogPost.category ? 
           <span>in&nbsp;
             {props.data.contentfulBlogPost.category.map((cat, index, arr) => (
              index === arr.length - 1 ? <Link to={`/blog/category/${cat["categoryName"].toLowerCase()}`}>{cat["categoryName"]}</Link> : <span><Link to={`/blog/category/${cat["categoryName"].toLowerCase()}`}>{cat["categoryName"]}</Link>, </span> 
              
          ))}
          </span>
             : null}</p>
          {documentToReactComponents(
            props.data.contentfulBlogPost.body.json, options
          )}
          {props.data.contentfulBlogPost.codeBlock2 != null && <div dangerouslySetInnerHTML={{ __html: props.data.contentfulBlogPost.codeBlock2.childMarkdownRemark.html }} /> }
          </div>
          </div>
          </Layout>
    )
};

export default Blog;