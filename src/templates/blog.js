import React from "react";

import Layout from "../components/layout"
import Head from "../components/head";
import Breadcrumbs from "../components/breadcrumb";
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from "simple-react-lightbox";
import { Link, graphql } from "gatsby";
import BookWidget from "../components/bookwidget";
import commentBox from 'commentbox.io';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Img from "gatsby-image";
import { PrismCode } from "../components/prism";
import * as layoutStyles from "../components/layout.module.scss";

export const query = graphql`
  query ($slug: String!) {
    contentfulBlogginnlegg(slug: {eq: $slug}) {
      title
      category {categoryName}
      publishedDate(formatString: "DD.MM.YY")
      body {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            fixed(width:750) {
              src
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
          ... on ContentfulKode {
            contentful_id
            id
            __typename
            childContentfulKodeKodeTextNode {
              kode
            }
            programmeringssprk
          }
          ... on ContentfulProgrammeringsord {
            __typename
            id
            contentful_id
            tittel
            betydning
          beskrivelse {
            raw
          }
          }
        }
      }
      ingress {
        raw
      }
      codeBlock2{
        childMarkdownRemark {
        rawMarkdownBody
      }
      }
      bokomtale {
        boktittel
        forfatter
        kategori
        sidetall
        bilde{
          fluid (maxWidth: 1000, quality: 50) {
          src
          }
        }
        publisert
        niv
        evaluering
        lest(formatString: "DD.MM.YY")
        oppsummering {
          oppsummering
        }
        link
      }
    }
  }
`




const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>


const Blog = (props) => {

  //setTimeout(() => Prism.highlightAll(), 0)

  console.log("REFERATER", props.data)

  if (props.data.contentfulBlogginnlegg.codeBlock2) {
    console.log("MARKDOWN", props.data.contentfulBlogginnlegg.codeBlock2.childMarkdownRemark.rawMarkdownBody)
  }

  const options4 = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
      [MARKS.CODE]: (text) => {
        return (
          <p>
          <PrismCode
            code={text}
            language="js"
            plugins={["line-numbers", "show-language"]}
          /></p>
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

        props.data.contentfulBlogginnlegg.body.references.forEach(el => {
          if (el.contentful_id === id && el.__typename === "ContentfulProgrammeringsord") {
            entry = <a href={`/programmeringsordbok/#${el.tittel}`}>{el.tittel}</a>
          } 
          if (el.contentful_id === id && el.__typename === "ContentfulKode") {
            entry = <p><PrismCode
            code={el.childContentfulKodeKodeTextNode.kode}
            language={el.programmeringssprk}
            plugins={["line-numbers", "show-language"]}
          /></p>
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
        props.data.contentfulBlogginnlegg.body.references.forEach(el => {
          if (el.contentful_id === node.data.target.sys.id) {
            entry = <a href={el.fixed.src}>{el.description}</a>
        }
        })
        return entry
      },
      [INLINES.ENTRY_HYPERLINK]: (function (id, children) {
        //let linkId = id.data.target.sys.id
        let hyperLink
        let typeName
        let title
        props.data.contentfulBlogginnlegg.body.references.forEach(function (el) {
          if (el.contentful_id === id.data.target.sys.id) {
            hyperLink = el.slug
            typeName = el.__typename
            title = el.tittel
          }
        })
        //<Link to={`/blogg/${id.data.target.sys.id}`}>{children}</Link>
        if (typeName === "ContentfulBlogginnlegg") return <Link to={`/blogg/${hyperLink}`}>{children}</Link>
        if (typeName === "ContentfulProgrammeringsord") return <Link to={`/programmeringsordbok/#${title}`}>{children}</Link>
        if (typeName === "ContentfulSider") return <Link to={`/${hyperLink}`}>{children}</Link>
      }),
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        const id = node.data.target.sys.id
        let entry

        props.data.contentfulBlogginnlegg.body.references.forEach(el => {
          if (el.contentful_id === id && el.__typename === "ContentfulProgrammeringsord") {
            entry = <p className={layoutStyles.orddefinisjon}>
            {el.tittel}
            {el.betydning}
            <a href={`/programmeringsordbok/#${el.tittel}`}>Se i ordlisten</a>
            </p>
          } 
          if (el.contentful_id === id && el.__typename === "ContentfulKode") {
            entry = <p><PrismCode
            code={el.childContentfulKodeKodeTextNode.kode}
            language={el.programmeringssprk}
            plugins={["line-numbers", "show-language"]}
          /></p>
          }
          if (el.contentful_id === id && el.__typename === "ContentfulBlogginnlegg") {
            entry = <p className={layoutStyles.orddefinisjon}>
            {el.title}
            {el.ingress}
            <a href={`/blogg/${el.slug}`}>Se blogginnlegg</a>
            </p>
          } 
          if (el.contentful_id === id && el.__typename === "ContentfulSider") {
            entry = <p className={layoutStyles.orddefinisjon}>
            {el.tittel}
            <a href={`/${el.slug}`}>Les mer på siden</a>
            </p>
          } 
        })
        return entry
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        console.log("EMBEDDED ASSET", node.data.target.sys.id)
        console.log(props.data.contentfulBlogginnlegg.body.references[0].contentful_id)
        const id = node.data.target.sys.id
        let image
        let width
        let height
        props.data.contentfulBlogginnlegg.body.references.forEach(el => {
          if (el.contentful_id === id) {
            image = el;
            width = el.resize.width
            height = el.resize.height
          } 
        })
        return <p><Img width={width} fluid={{
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
        }} /></p>
      },
    },
  }



  const CustomComponent = ({ text }) => (
    <p className={layoutStyles.ingress}>{text}</p>
  );

  const ingressOptions = {
    renderNode: {
      [BLOCKS.DOCUMENT]: (node) => {
        const text = node.content[0].content[0].value;
        console.log("TEXT", text)
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

  if (!props.data.contentfulBlogginnlegg.category) {
    props.data.contentfulBlogginnlegg.category = [];
    props.data.contentfulBlogginnlegg.category.push({ categoryName: "Ukategorisert" })
  }

  return (
    <Layout>
      <SimpleReactLightbox>
        <Head title={props.data.contentfulBlogginnlegg.title} description="df" />
        <div className={layoutStyles.contentWrapper}>
          <div className={layoutStyles.contentInner}>
            <Breadcrumbs crumbs={['/', 'Blogg', props.data.contentfulBlogginnlegg.title]} />
            <h1>{props.data.contentfulBlogginnlegg.title}</h1>
            <p className={layoutStyles.date}>{props.data.contentfulBlogginnlegg.publishedDate}, {props.data.contentfulBlogginnlegg.category ?
              <span>
                {props.data.contentfulBlogginnlegg.category.map((cat, index, arr) => (
                  index === arr.length - 1 ? <Link key={index} to={`/blogg/kategori/${cat["categoryName"].toLowerCase()}`}>#{cat["categoryName"]}</Link> : <span key={index}><Link to={`/blogg/kategori/${cat["categoryName"].toLowerCase()}`}>#{cat["categoryName"]}</Link> </span>

                ))}
              </span>
              : null}</p>
            <SRLWrapper>
              {props.data.contentfulBlogginnlegg.bokomtale ? <BookWidget bookdetails={props.data.contentfulBlogginnlegg} bloggkort={true} /> : null}


              <div>{props.data.contentfulBlogginnlegg.ingress != null &&
                documentToReactComponents(
                  JSON.parse(props.data.contentfulBlogginnlegg.ingress.raw), ingressOptions
                )}</div>

              {documentToReactComponents(
                JSON.parse(props.data.contentfulBlogginnlegg.body.raw), options4
              )}



            </SRLWrapper>
            <PageWithComments />
          </div>
        </div>

      </SimpleReactLightbox>
    </Layout>
  )
};

export default Blog;

/*
{props.data.contentfulBlogginnlegg.ingress != null &&
              documentToReactComponents(
                props.data.contentfulBlogginnlegg.ingress.json, ingressOptions
              )
              }


{props.data.contentfulBlogginnlegg.codeBlock2 != null && <div><ReactMarkdown>{props.data.contentfulBlogginnlegg.codeBlock2.childMarkdownRemark.rawMarkdownBody}</ReactMarkdown> </div>}

*/