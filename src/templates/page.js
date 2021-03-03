import React from "react";
import { graphql} from "gatsby";
import Layout from "../components/layout";
import Head from "../components/head";
import Breadcrumbs from "../components/breadcrumb";
import blogStyles from "../pages/blog.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from "simple-react-lightbox";

export const query = graphql`
  query ($slug: String!) {
    contentfulSider(slug: {eq: $slug}) {
      tittel
      ingress {
        ingress
      }
      brodtekst {
        json
      }
    }
  }
`




const Page = (props, {pageContext}) => {

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
          <Head title={props.data.contentfulSider.tittel}/>
          <div className={blogStyles.wrapper}>
        <div className={blogStyles.wrapperInner}>
          <Breadcrumbs crumbs={ [ '/', `${props.data.contentfulSider.tittel}`] } />
          <h1 className={blogStyles.header}>{props.data.contentfulSider.tittel}</h1>
          
          <p className={blogStyles.ingress}>
            {props.data.contentfulSider.ingress.ingress}
          </p>
          <SimpleReactLightbox>
          <SRLWrapper>
          {documentToReactComponents(
            props.data.contentfulSider.brodtekst.json, options
          )}
          </SRLWrapper>
          </SimpleReactLightbox>
          </div>
          </div>
      </Layout>
      
  )
};

export default Page;