import React from "react";
import { graphql } from "gatsby";
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
    contentfulCodingLog(slug: {eq: $slug}) {
      title
      publishedDate(formatString: "MMMM Do, YYYY")
      body {
        json
      }
     
    }
  }
`

const CodeLog = (props) => {
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
          <Head title={props.data.contentfulCodingLog.title}/>
          <div className={layoutStyles.contentWrapper}>
          <Breadcrumbs crumbs={ [ '/', 'Coding Log', props.data.contentfulCodingLog.title ] } />
          <h1>{props.data.contentfulCodingLog.title}</h1>
          <p className={layoutStyles.date}>{props.data.contentfulCodingLog.publishedDate}</p>
          {documentToReactComponents(
            props.data.contentfulCodingLog.body.json, options
          )}
          
          
             
            </div>
        </Layout>
    )
};

export default CodeLog;