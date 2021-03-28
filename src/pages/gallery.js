import React from 'react';
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Head from "../components/head";
import Breadcrumbs from "../components/breadcrumb";
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from "simple-react-lightbox";
import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry from 'react-masonry-css';
import Img from 'gatsby-image';
import * as blogStyles from "../pages/blog.module.scss";
import * as galleryStyles from "../pages/gallery.module.scss";









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
                        
                        <Img width={item.resize.width} fluid={{
                          aspectRatio: item.resize.width / item.resize.height,
                          src: item.fluid.src + '?w=630&q=80',
                          srcSet: ` 
                ${item.fluid.src}?w=${item.resize.width / 4}&&q=80 ${item.resize.width / 4}w,
                ${item.fluid.src}?w=${item.resize.width / 2}&&q=80 ${item.resize.width / 2}w,
                ${item.fluid.src}?w=${item.resize.width}&&q=80 ${item.resize.width}w,
                ${item.fluid.src}?w=${item.resize.width * 1.5}&&q=80 ${item.resize.width * 1.5}w,
                ${item.fluid.src}?w=1000&&q=80 1000w,
            `,
                          sizes: '(max-width: 630px) 100vw, 630px'
                        }} />
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
            resize (quality:50) {
                src
                width
                height
              }
              description
            file {
              url
            }
            fluid(maxWidth: 1000) {
              src
              srcWebp
              srcSet
              sizes
            }
            updatedAt
          }
        }
      }
    }
}
`
