import React, { useState } from 'react';

import * as blogStyles from "../pages/blog.module.scss";
import * as galleryStyles from "../pages/gallery.module.scss";
import Masonry from 'react-masonry-css';
import Breadcrumbs from "../components/breadcrumb";
import { graphql } from "gatsby";
import Head from "../components/head";
import Layout from "../components/layout";
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from "simple-react-lightbox";











const GalleryImages = ({ data }) => {
    const { allContentfulBildegalleri } = data

    const bilder = allContentfulBildegalleri.edges.map(function (node) {
        return node.node.galleribilder.map(function (item) {
            return item;
        })
    });
    const breakpointColumnsObj = {
        default: 4,
        1200: 3,
        700: 2,
        500: 1
      };

    return (
        <Layout>
            <Head title={"Bibliotek"} />
            <div className={blogStyles.wrapper}>
                <div className={blogStyles.wrapper_inner_library}>
                    <Breadcrumbs crumbs={['/', `Galleri`]} />
                    <h1 className={blogStyles.header}>Galleri</h1>
                    <div className={galleryStyles.container}>
                    <SimpleReactLightbox>
            <SRLWrapper>
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className={galleryStyles.my_masonry_grid}
                            columnClassName={galleryStyles.my_masonry_grid_column}>
                            {bilder[0].map(function (item, index) {
                                
                                    return (

                                               <div key={index}> 
                                               <img src={item.resize.src} alt={item.description} />
                                               </div>
                                    )
                              
                            })}
                        </Masonry>
                        </SRLWrapper>
            </SimpleReactLightbox>
                    </div>
                </div>
            </div>
        </Layout>

    )
};


export default GalleryImages;


export const query = graphql`
query {
    allContentfulBildegalleri {
    	edges {
        node {
          galleribilder {
            resize (quality:50 width:1000 jpegProgressive:true) {
                src
              }
              description
            file {
              url
            }
            fluid {
                aspectRatio
            }
            updatedAt
          }
        }
      }
    }
}
`
