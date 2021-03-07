import React from "react";
import commentBox from 'commentbox.io';
import { Link,  graphql } from "gatsby";
import { BLOCKS } from '@contentful/rich-text-types';
import Layout from "../components/layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Head from "../components/head";
import layoutStyles from "../components/layout.module.scss";
import Breadcrumbs from "../components/breadcrumb";
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from "simple-react-lightbox";


export const query = graphql`
  query ($slug: String!) {
    contentfulBlogginnlegg(slug: {eq: $slug}) {
      title
      category {categoryName}
      publishedDate(formatString: "DD.MM.YY")
      body {
        json
      }
      ingress {
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
/*
  const ingressOptions = {
    renderNode: {
      "document": (node) => {
      return <p className={layoutStyles.ingress}>{node.content[0].content[0].value}</p>
      }
    }
  }
  */

 const CustomComponent = ({ text }) => (
    <p className={layoutStyles.ingress}>{text}</p>
);
 
const ingressOptions = {
  renderNode: {
    [BLOCKS.DOCUMENT]: (node) => {
      const text = node.content[0].content[0].value;
      return <CustomComponent text={text} />
    }
  }
};

class PageWithComments extends React.Component {

  componentDidMount() {
  
      this.removeCommentBox = commentBox('my-project-id');
  }
  
  componentWillUnmount() {
  
      this.removeCommentBox();
  }
  
  render() {
  
      return (
          <div className="commentbox" />
      );
  }
  }
  
  if(!props.data.contentfulBlogginnlegg.category) {
    props.data.contentfulBlogginnlegg.category = [];
    props.data.contentfulBlogginnlegg.category.push({categoryName: "Ukategorisert"})
  }

console.log(props.data.contentfulBlogginnlegg)

    return (
        <Layout>
          <SimpleReactLightbox>
          <Head title={props.data.contentfulBlogginnlegg.title} description="df"/>
          <div className={layoutStyles.contentWrapper}>
          <div className={layoutStyles.contentInner}>
          <Breadcrumbs crumbs={ [ '/', 'Blogg', props.data.contentfulBlogginnlegg.title ] } />
          <h1>{props.data.contentfulBlogginnlegg.title}</h1>
          <p className={layoutStyles.date}>{props.data.contentfulBlogginnlegg.publishedDate}, {props.data.contentfulBlogginnlegg.category ? 
           <span>
             {props.data.contentfulBlogginnlegg.category.map((cat, index, arr) => (
              index === arr.length - 1 ? <Link key={index} to={`/blogg/kategori/${cat["categoryName"].toLowerCase()}`}>#{cat["categoryName"]}</Link> : <span key={index}><Link to={`/blogg/kategori/${cat["categoryName"].toLowerCase()}`}>#{cat["categoryName"]}</Link> </span> 
              
          ))}
          </span>
             : null}</p>
          <SRLWrapper>
              {props.data.contentfulBlogginnlegg.ingress != null && 
              documentToReactComponents(
                props.data.contentfulBlogginnlegg.ingress.json, ingressOptions
              )
              }
          
          {documentToReactComponents(
            props.data.contentfulBlogginnlegg.body.json, options
          )}
          {props.data.contentfulBlogginnlegg.codeBlock2 != null && <div dangerouslySetInnerHTML={{ __html: props.data.contentfulBlogginnlegg.codeBlock2.childMarkdownRemark.html }} /> }

          </SRLWrapper>
          <PageWithComments/>
          </div>
          </div>
          
          </SimpleReactLightbox>
        </Layout>
    )
};

export default Blog;