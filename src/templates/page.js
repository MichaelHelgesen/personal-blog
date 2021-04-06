import React from "react";

import Layout from "../components/layout";
import Head from "../components/head";
import Breadcrumbs from "../components/breadcrumb";
import { SRLWrapper } from "simple-react-lightbox";
import SimpleReactLightbox from 'simple-react-lightbox';
import Img from "gatsby-image";
import { Link, graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import commentBox from 'commentbox.io';
import { PrismCode } from "../components/prism";

import ReactMarkdown from 'react-markdown'

import * as blogStyles from "../pages/blog.module.scss";
import * as pageStyles from "../templates/pages.module.scss"
import * as embeddedStyles from "../components/embedded-links.module.scss"

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
      tekst {
          raw
          references {
            ... on ContentfulAsset {
              contentful_id
              __typename
              title
              file {
                url
                contentType
                fileName
              }
              fixed(width:750) {
                src
                width
                height
              }
              fluid(maxWidth: 1000) {
                src
                srcWebp
                srcSet
                sizes
              }
              description
              resize (quality:50) {
                width
                height
              }
            }
            ... on ContentfulBlogginnlegg {
              contentful_id
              title
              __typename
              slug
              body {
                raw
              }
            }
            ... on ContentfulSider {
              contentful_id
              __typename
              id
              tittel
              slug
            }
            
            
        }
      }
    }
  }
`




const Page = (props, { pageContext }) => {

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

  const Bold = ({ children }) => <span className="bold">{children}</span>
  const Text = ({ children }) => <p className="align-center">{children}</p>
  

  const options4 = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
      [MARKS.CODE]: (text) => {
        return (
          <PrismCode
            code={text}
            language="js"
            plugins={["line-numbers", "show-language"]}
          />
        );
      },
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        if (
          node.content.length === 1 &&
          node.content[0].marks.find((x) => x.type === "code")
        ) {
          return <div>{children}</div>;
        } else {
          return <Text>{children}</Text>
        }
      },
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        const id = node.data.target.sys.id
        let entry

        props.data.contentfulSider.tekst.references.forEach(el => {
          if (el.contentful_id === id && el.__typename === "ContentfulProgrammeringsord") {
            entry = <a href={`/programmeringsordbok/#${el.tittel}`}>{el.tittel}</a>
          } 
          if (el.contentful_id === id && el.__typename === "ContentfulKode") {
            entry = <PrismCode
            code={el.childContentfulKodeKodeTextNode.kode}
            language={el.programmeringssprk}
            plugins={["line-numbers", "show-language"]}
          />
          }
          if (el.contentful_id === id && el.__typename === "ContentfulBlogginnlegg") {
            entry = <a href={`/blogg/${el.slug}`}>{el.title}</a>
          } 
          if (el.contentful_id === id && el.__typename === "ContentfulSider") {
            entry = <a href={`/${el.slug}`}>{el.tittel}</a>
          } 
          
        })
        return entry
      },
      [INLINES.ASSET_HYPERLINK]: (node, children) => {
        let entry
        props.data.contentfulSider.tekst.references.forEach(el => {
          if (el.contentful_id === node.data.target.sys.id) {
            entry = <a href={el.file.url}>{el.description}</a>
        }
        })
        return entry
      },
      [INLINES.ENTRY_HYPERLINK]: (function (id, children) {
        //let linkId = id.data.target.sys.id
        console.log("ID", id)
        console.log("children", children)
        let hyperLink
        let typeName
        let title
        props.data.contentfulSider.tekst.references.forEach(function (el) {
          if (el.contentful_id === id.data.target.sys.id) {
            hyperLink = el.slug
            typeName = el.__typename
            title = el.tittel
          }
        })
        //<Link to={`/blogg/${id.data.target.sys.id}`}>{children}</Link>
        if (typeName === "ContentfulBlogginnlegg") return <Link to={`/blogg/${hyperLink}`}>{children}</Link>
        if (typeName === "ContentfulProgrammeringsord") return <Link to={`/programmeringsordbok/#${title}`}>{children}</Link>
      }),
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        const id = node.data.target.sys.id
        let entry

        props.data.contentfulSider.tekst.references.forEach(el => {
          if (el.contentful_id === id && el.__typename === "ContentfulProgrammeringsord") {
            entry = <p className={embeddedStyles.orddefinisjon}>
            {el.tittel}
            {el.betydning}
            <a href={`/programmeringsordbok/#${el.tittel}`}>Se i ordlisten</a>
            </p>
          } 
          if (el.contentful_id === id && el.__typename === "ContentfulKode") {
            entry = <PrismCode
            code={el.childContentfulKodeKodeTextNode.kode}
            language={el.programmeringssprk}
            plugins={["line-numbers", "show-language"]}
          />
          }
          if (el.contentful_id === id && el.__typename === "ContentfulBlogginnlegg") {
            
            entry = <section className={embeddedStyles.blogglink}>
            <a href={`/blogg/${el.slug}`}>
              <h4>{el.title}</h4>
                Les blogginnlegget
                </a>
        </section>
          } 
          if (el.contentful_id === id && el.__typename === "ContentfulSider") {
            console.log("SIDER", el)
            entry = <section className={embeddedStyles.blogglink}>
            <a href={`/${el.slug}`}>
            <h4>{el.tittel}</h4>
            
                Les mer på siden
                </a>
        </section>
          }
        })
        return entry
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const id = node.data.target.sys.id
        console.log("ASSET", node)
        let type
        let image
        let width
        let height
        let src
        let tittel
        props.data.contentfulSider.tekst.references.forEach(el => {
          if (el.contentful_id === id) {
            if (el.file.contentType.indexOf("image") === 0 ) {
              type = "image"
            console.log("type", type)    
            image = el;
            console.log("ELEMENT", el.file.contentType.indexOf("image"))
            width = el.resize.width
            console.log(width)
            height = el.resize.height
            } else {
              type = "file"
              src = el.file.url
              tittel = el.title
            }
            
          } 
        })
        if (type === "image") {
          return <span className={pageStyles.imagewrapper}><Img width={width} fluid={{
            aspectRatio: width / height,
            src: image.fluid.src + '?w=630&q=80',
            srcSet: ` 
                  ${image.fluid.src}?w=${width / 4}&&q=80 ${width / 4}w,
                  ${image.fluid.src}?w=${width / 2}&&q=80 ${width / 2}w,
                  ${image.fluid.src}?w=${width}&&q=80 ${width}w,
                  ${image.fluid.src}?w=${width * 1.5}&&q=80 ${width * 1.5}w,
                  ${image.fluid.src}?w=1000&&q=80 1000w,
              `,
            sizes: '(max-width: 630px) 100vw, 630px'
          }} /></span>
        } else {
          return (<section className={embeddedStyles.blogglink}>
            <a href={src}>
            <h4>{tittel}</h4>
                Last ned
                </a>
        </section>)
        }
        
      },
    },
  }



  return (
    <Layout>
      <Head title={props.data.contentfulSider.tittel} />
      <div className={blogStyles.wrapper}>
        <div className={blogStyles.wrapperInner}>
          <Breadcrumbs crumbs={['/', `${props.data.contentfulSider.tittel}`]} />
          <h1 className={blogStyles.header}>{props.data.contentfulSider.tittel}</h1>

          <p className={blogStyles.ingress}>
            {props.data.contentfulSider.ingress.ingress}
          </p>
          <SimpleReactLightbox>
            <SRLWrapper>
              <ReactMarkdown>
                {props.data.contentfulSider.brodtekst.brodtekst}
              </ReactMarkdown>
              {documentToReactComponents(
                JSON.parse(props.data.contentfulSider.tekst.raw), options4
              )}
            </SRLWrapper>
          </SimpleReactLightbox>
          <PageWithComments />
        </div>
      </div>
    </Layout>

  )
};

export default Page;