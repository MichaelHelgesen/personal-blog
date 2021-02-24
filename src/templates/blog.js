import React from "react";
import { Link,  graphql } from "gatsby";
import Layout from "../components/layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Head from "../components/head";
import layoutStyles from "../components/layout.module.scss";
import Breadcrumbs from "../components/breadcrumb";
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from "simple-react-lightbox";
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
      publishedDate(formatString: "DD.MM.YY")
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
          <SimpleReactLightbox>
          <Head title={props.data.contentfulBlogPost.title}/>
          <div className={layoutStyles.contentWrapper}>
          <div className={layoutStyles.contentInner}>
          <Breadcrumbs crumbs={ [ '/', 'Blogg', props.data.contentfulBlogPost.title ] } />
          <h1>{props.data.contentfulBlogPost.title}</h1>
          <p className={layoutStyles.date}>{props.data.contentfulBlogPost.publishedDate}, {props.data.contentfulBlogPost.category ? 
           <span>
             {props.data.contentfulBlogPost.category.map((cat, index, arr) => (
              index === arr.length - 1 ? <Link key={index} to={`/blogg/kategori/${cat["categoryName"].toLowerCase()}`}>#{cat["categoryName"]}</Link> : <span key={index}><Link to={`/blogg/kategori/${cat["categoryName"].toLowerCase()}`}>#{cat["categoryName"]}</Link> </span> 
              
          ))}
          </span>
             : null}</p>
          <SRLWrapper>
          {documentToReactComponents(
            props.data.contentfulBlogPost.body.json, options
          )}
          {props.data.contentfulBlogPost.codeBlock2 != null && <div dangerouslySetInnerHTML={{ __html: props.data.contentfulBlogPost.codeBlock2.childMarkdownRemark.html }} /> }
          </SRLWrapper>
          </div>
          </div>
          </SimpleReactLightbox>
        </Layout>
    )
};

export default Blog;