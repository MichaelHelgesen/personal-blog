import React, { useState } from 'react';



import Layout from "../components/layout"
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from "simple-react-lightbox";
import Head from "../components/head";
import Breadcrumbs from "../components/breadcrumb";
import Search from "../components/searchList";
import Img from "gatsby-image";
import { Link, graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';

import * as blogStyles from "../pages/blog.module.scss";
import * as styles from "../pages/programmeringsordbok.module.scss";

import { PrismCode } from "../components/prism";




const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => {
    return <p>{children}</p>
}



const ProgrammeringsOrdliste = ({ data }) => {

    console.log("DATA", data.allContentfulProgrammeringsord.edges)

    //setTimeout(() => Prism.highlightAll(), 0)
    // const { allContentfulProgrammeringsord } = data;
    // const { assets } = data;
    // const { pages } = data;
    // const { blogs } = data;



    const [ordListe, setOrdListe] = useState(data.allContentfulProgrammeringsord.edges)
    const [searchQuery, setSearchQuery] = useState("")


    const filterWords = (arr, query) => {
        return arr.filter(item => {
            const word = item.node.tittel + " " + item.node.betydning;
            return word.toLowerCase().includes(query.toLowerCase())
        });
    }



    let posts = searchQuery ? filterWords(data.allContentfulProgrammeringsord.edges, searchQuery) : ordListe




    const findLetters = (arr) => {
        let newArr = []
        arr.forEach((item) => {
            const index = newArr.findIndex((e) => e.letter === item.node.tittel.slice(0, 1));
            if (index === -1) {
                newArr.push({ letter: item.node.tittel.slice(0, 1), tittel: item.node.tittel });
            }
        })
        return newArr
    }

    let letters = searchQuery ? findLetters(filterWords(data.allContentfulProgrammeringsord.edges, searchQuery)) : findLetters(ordListe)

    console.log("LETTER", letters)
    /*
        function getLetters(blogPosts) {
            const uniqueLetters = new Set()
            // Iterate over all articles
            blogPosts.forEach(({ node }, index) => {
                // Iterate over each category in an article
                uniqueLetters.add({ letter: node.tittel.slice(0, 1), tittel: node.tittel })
            })
            // Create new array with duplicates removed
            return Array.from(uniqueLetters)
        }
    
        let letterMenu = searchQuery ? getLetters(searchQuery) : getLetters(ordListe);
    console.log("LETTERMENU", letterMenu);*/
    /*
          function pushToArray(arr, obj) {
            const index = arr.findIndex((e) => e.letter === obj.letter);
        
            if (index === -1) {
                arr.push(obj);
            } 
        }*/

    //const newArr = []



    //console.log("dsfsdfsdfs", findLetters(ord))

    const newArr2 = []

    data.allContentfulProgrammeringsord.edges.forEach((item) => {
        const index = newArr2.findIndex((e) => e.letter === item.node.tittel.slice(0, 1));
        if (index === -1) {
            newArr2.push({ letter: item.node.tittel.slice(0, 1), tittel: item.node.tittel });
        }
    })

    /*  const testing = letterMenu.map((item) => {
        pushToArray(newArr, item)
      })*/




    //console.log("GET LETTERS", getLetters(ord));

    const options = {
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
                    return <div className={styles.kode}>{children}</div>;
                } else {
                    return <Text>{children}</Text>
                }
            },
            [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
                console.log(node)
                console.log(children)
                let url
                let title
                let type
                let entry
                data.allContentfulProgrammeringsord.edges.forEach(item => {
                    item.node.beskrivelse.references.forEach(el => {
                       
                        if (el.contentful_id === node.data.target.sys.id && el.__typename === "ContentfulKode") {
                            entry = <PrismCode
                            code={el.childContentfulKodeKodeTextNode.kode}
                            language={el.programmeringssprk}
                            plugins={["line-numbers", "show-language"]}
                          />
                          }
                        /*if (el.contentful_id === node.data.target.sys.id) {
                            url = el.slug
                            if (el.tittel) {
                                title = el.tittel
                                type = el.__typename
                            } else {
                                title = el.title
                                type = el.__typename
                            }
                        }*/
                    })

                })
                return (entry)
            },
            [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
                let source
                let width
                let height
                data.allContentfulProgrammeringsord.edges.forEach(item => {
                    item.node.beskrivelse.references.forEach(el => {
                        if (el.contentful_id === node.data.target.sys.id) {
                            source = el.fluid.src
                            width = el.fixed.width
                            height = el.fixed.height
                            console.log("source", source)
                            console.log("width", width)
                            console.log("height", height)
                            //title = el.node.title
                        }
                    })

                })
                return (<Img width={width} fluid={{
                    aspectRatio: width / height,
                    src: source + '?w=630&q=80',
                    srcSet: ` 
          ${source}?w=${Math.floor(width / 4)}&&q=80 ${Math.floor(width / 4)}w,
          ${source}?w=${width / 2}&&q=80 ${width / 2}w,
          ${source}?w=${width}&&q=80 ${width}w,
          ${source}?w=${width * 1.5}&&q=80 ${width * 1.5}w,
          ${source}?w=1000&&q=80 1000w,
      `,
                    sizes: '(max-width: 630px) 100vw, 630px'
                }} />)
            },
            [INLINES.EMBEDDED_ENTRY]: (node, children) => {
                console.log(node)
                console.log(children)
                let url
                let title
                //const { title, siteUrl } = useSiteMetadata(node.data.target.sys.id);
                data.allContentfulProgrammeringsord.edges.forEach(item => {
                    item.node.beskrivelse.references.forEach(el => {
                        if (el.contentful_id === node.data.target.sys.id) {
                            url = el.slug
                            title = el.title
                        }
                    })

                })
                return (<Link to={`/blogg/${url}`}>{title}</Link>)
            },
            [INLINES.ASSET_HYPERLINK]: (node, children) => {

                return <p>ASSET HYPERLINK</p>
            },
            [INLINES.HYPERLINK]: (node, children) => {

                return <a href={node.data.uri}>{children}</a>
            },
            [INLINES.ENTRY_HYPERLINK]: (node, children) => {

                return <p>ENTRY HYPERLINK</p>
            },
            [BLOCKS.HYPERLINK]: (id, children) => {

                //let linkId = id.data.target.sys.id

                //<Link to={`/blogg/${id.data.target.sys.id}`}>{children}</Link>
                return <p>BLOCK HYPERLINK</p>
            }
        }
    }
    /*
    const sortedWords = ord.edges.map((node) => {
        return node
    }).sort(function(a,b) {
        console.log("SORTED A", a)
        if (a.node.tittel > b.node.tittel) return 1
        if (a.node.tittel < b.node.tittel) return -1
        return 0;
    })
    */
    return (
        <Layout>
            <SimpleReactLightbox>
                <SRLWrapper>
                    <Head title={"Programmeringsordliste"} />
                    <div className={blogStyles.wrapper}>
                        <div className={blogStyles.wrapperInner}>
                            <Breadcrumbs crumbs={['/', `Programmeringsordliste`]} />
                            <h1 className={blogStyles.header}>Programmeringsordliste</h1>
                            <div className={styles.ordwrapper}>
                                <Search
                                    setOrdliste={setOrdListe}
                                    ordListe={data.allContentfulProgrammeringsord}
                                    setSearchQuery={setSearchQuery}
                                    searchQuery={searchQuery}
                                />
                                <p className={styles.indeks}>{`Indeks: `}
                                    {posts.length ?
                                        letters.map((node, index) => (
                                            <a key={index} href={`#${node.tittel}`}>{node.letter}</a>
                                        )
                                        )
                                        : ""}


                                </p>


                                {posts.length ?
                                    posts.map((node, index) => (

                                        <div key={index}>

                                            <a className={styles.tittel} href={`#${node.node.tittel}`} name={node.node.tittel}>{searchQuery && searchQuery !== " " ? (node.node.tittel.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ? <span>{node.node.tittel.slice(0, node.node.tittel.toLowerCase().indexOf(searchQuery.toLowerCase()))}<span className={styles.searchhit}>{node.node.tittel.slice(node.node.tittel.toLowerCase().indexOf(searchQuery.toLocaleLowerCase()), node.node.tittel.toLowerCase().indexOf(searchQuery.toLocaleLowerCase()) + searchQuery.length)}</span>{node.node.tittel.slice(node.node.tittel.toLowerCase().indexOf(searchQuery.toLocaleLowerCase()) + searchQuery.length, node.node.tittel.length)}</span>  : node.node.tittel ): node.node.tittel}:</a>
                                            
                                            <span className={styles.betydning}> {searchQuery && searchQuery !== " " ? (node.node.betydning.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ? <span>{node.node.betydning.slice(0, node.node.betydning.toLowerCase().indexOf(searchQuery.toLowerCase()))}<span className={styles.searchhit}>{node.node.betydning.slice(node.node.betydning.toLowerCase().indexOf(searchQuery.toLocaleLowerCase()), node.node.betydning.toLowerCase().indexOf(searchQuery.toLocaleLowerCase()) + searchQuery.length)}</span>{node.node.betydning.slice(node.node.betydning.toLowerCase().indexOf(searchQuery.toLocaleLowerCase()) + searchQuery.length, node.node.betydning.length)}</span>  : node.node.betydning ): node.node.betydning}</span>
                                            {documentToReactComponents(
                                                JSON.parse(node.node.beskrivelse.raw), options
                                            )}
                                        </div>


                                    ))
                                    : <h2>Beklager, ingen treff</h2>}

                            </div>

                        </div>
                    </div>
                </SRLWrapper>
            </SimpleReactLightbox>
        </Layout>

    )
};


export default ProgrammeringsOrdliste;




export const query = graphql`
query {
    allContentfulProgrammeringsord (sort: {
         fields: tittel,
         order: ASC
       }) {
         edges {
           node {
             id
           tittel
           betydning
           beskrivelse {
             raw
             references {
               
                ... on ContentfulAsset {
                  contentful_id
              __typename
              fixed(width:750) {
                src
                width
                height
              }
              fluid(maxWidth:1000) {
                src
                srcWebp
                srcSet
                sizes
              }
              description
              resize (quality:1) {
                width
                height
              }
                }
                
                ... on ContentfulKode {
                    __typename
                    contentful_id
                    programmeringssprk
                    childContentfulKodeKodeTextNode {kode}
                  }
                
                  
              }
           }
           }
         }
     }
 }
`

/*
export const query = graphql`
query  AllAssets {
    ord: allContentfulProgrammeringsord (sort: {
        fields: tittel,
        order: ASC
      }) {
        edges {
          node {
            id
          tittel
          betydning
          beskrivelse {
            raw
          }
          }
        }
      }
     assets: allContentfulAsset {
        edges {
          node {
            id
            contentful_id
            fluid (maxWidth:1000, quality:80) {
                src
              }
          }
        }
      }
      blogs: allContentfulBlogginnlegg {
        edges  {
          node {
            slug
            contentful_id
            title
            ingress {
                raw
            }
          }
        }
      }
      pages: allContentfulSider {
        edges {
          node {
            slug
            contentful_id
          }
        }
      }
}
`
*/