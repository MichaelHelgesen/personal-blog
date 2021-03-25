import React from "react";

import * as blogStyles from "../pages/blog.module.scss";
import Breadcrumbs from "../components/breadcrumb";
import commentBox from 'commentbox.io';
import { graphql} from "gatsby";
import Head from "../components/head";
import Layout from "../components/layout";
import ReactMarkdown from 'react-markdown'
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
        brodtekst
      }
    }
  }
`




const Page = (props, {pageContext}) => {

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
          <ReactMarkdown>
            {props.data.contentfulSider.brodtekst.brodtekst}
            </ReactMarkdown>
          </SRLWrapper>
          </SimpleReactLightbox>
          <PageWithComments/>
          </div>
          </div>
      </Layout>
      
  )
};

export default Page;