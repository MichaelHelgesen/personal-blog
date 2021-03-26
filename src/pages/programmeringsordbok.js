import React, { useState } from 'react';

import * as blogStyles from "../pages/blog.module.scss";
import * as styles from "../pages/programmeringsordbok.module.scss";
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import Breadcrumbs from "../components/breadcrumb";
import commentBox from 'commentbox.io';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Head from "../components/head";
import Img from "gatsby-image";
import Layout from "../components/layout"
import { Link, graphql } from "gatsby";
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from "simple-react-lightbox";
import { PrismCode } from "../components/prism";
import Search from "../components/searchList";



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
            console.log("WORD", word)
            return word.toLowerCase().includes(query.toLowerCase())
        });
    }



    let posts = searchQuery ? filterWords(data.allContentfulProgrammeringsord.edges, searchQuery) : ordListe

   


    const findLetters = (arr) => {
        let newArr = []
        arr.map((item) => {
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

    data.allContentfulProgrammeringsord.edges.map((item) => {
        const index = newArr2.findIndex((e) => e.letter === item.node.tittel.slice(0, 1));
        if (index === -1) {
            newArr2.push({ letter: item.node.tittel.slice(0, 1), tittel: item.node.tittel });
        }
    })

    /*  const testing = letterMenu.map((item) => {
        pushToArray(newArr, item)
      })*/

    
    console.log("NEWARR2", newArr2);


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
                data.allContentfulProgrammeringsord.edges.map(item => {
                    item.node.beskrivelse.references.map(el => {
                        if (el.contentful_id === node.data.target.sys.id) {
                            url = el.slug
                            if (el.tittel) {
                                title = el.tittel
                                type = el.__typename
                            } else {
                                title = el.title
                                type = el.__typename
                            }
                        } return
                    })
                    return
                })
                return (<p className={styles.fremmhevet}>
                        {title}
                        {type === "ContentfulBlogginnlegg" ?
                        <Link to={`/blogg/${url}`}>Les blogginnlegget</Link> :
                        <Link to={`/${url}`}>Gå til siden</Link> }
                    </p>)
            },
            [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
                let src
                let title
                data.allContentfulProgrammeringsord.edges.map(item => {
                    item.node.beskrivelse.references.map(el => {
                        if (el.contentful_id === node.data.target.sys.id) {
                            src = el.fluid.src
                            //title = el.node.title
                        } return
                    })
                    return
                })
                return (<img src={src} />)
            },
            [INLINES.EMBEDDED_ENTRY]: (node, children) => {
                console.log(node)
                console.log(children)
                let url
                let title
                //const { title, siteUrl } = useSiteMetadata(node.data.target.sys.id);
                data.allContentfulProgrammeringsord.edges.map(item => {
                    item.node.beskrivelse.references.map(el => {
                        if (el.contentful_id === node.data.target.sys.id) {
                            url = el.slug
                            title = el.title
                        } return
                    })
                    return
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
                let hyperLink
                let typeName
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
                        : "" }
                        
                        
                        </p>

                       
                        {posts.length ?
                            posts.map((node, index) => (

                                <div key={index}>

                                    <a className={styles.tittel} name={node.node.tittel}>{node.node.tittel}: </a>
                                    <span className={styles.betydning}>{node.node.betydning}</span>
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
                ... on ContentfulBlogginnlegg {
                  contentful_id
              title
              __typename
              slug
              body {
                raw
              }
                }
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
              resize (quality:1) {
                width
                height
              }
                }
                ... on ContentfulEntry {
                  __typename
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