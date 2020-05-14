import Layout from "../components/layout";
import React from 'react';
import { Link, graphql } from "gatsby";
import Breadcrumbs from "../components/breadcrumb";
import blogStyles from "../pages/blog.module.scss";
import Head from "../components/head";

const BlogPostList = ({ data, pageContext }) => {
  const { allContentfulBlogPost } = data
  return (
    <Layout>
    <Head title="Bloger" />
    
    <div className={blogStyles.wrapper}>
    <div className={blogStyles.wrapperInner}>
        <Breadcrumbs crumbs={ [ '/', 'Blogger' ] } />
        <h1 className={blogStyles.header}>Blog</h1>


    <div>
      {allContentfulBlogPost.edges.map(({ node }) => {
        return (
          <div>
            <Link to={`coding_log/${node.slug}`}>
            {console.log(node.slug)}
              <h1>{node.title}</h1>
            </Link>
            <p>{node.publishedDate}</p>
          </div>
        )
      })}
      <ul>
                {Array.from({ length: pageContext.numPages }).map((item, i) => {
                  const index = i + 1
                  const link = index === 1 ? '/blogger' : `/blogger/page/${index}`
                  return (
                    <li>
                      {pageContext.currentPage === index ? (
                        <span>{index}</span>
                      ) : (
                        <a href={link}>{index}</a>
                      )}
                    </li>
                  )
                })}
              </ul>
    </div>
    </div>
    </div>
    </Layout>
  )
}
export default BlogPostList
export const query = graphql`
  query blogPostsList($skip: Int!, $limit: Int!) {
    allContentfulBlogPost (
      sort: {
        fields:publishedDate,
        order: DESC
      }
      limit: $limit
      skip: $skip
    ) { 
      edges { 
        node { 
           title
           slug
           publishedDate (formatString:"MMMM Do, YYYY")
      }
    }
  }
  }
`



/*
import React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery} from "gatsby";
import Breadcrumbs from "../components/breadcrumb";
import blogStyles from "../pages/blog.module.scss";
import Head from "../components/head";
import Pagination from "../components/pagination"

const BlogPage = ({ pageContext }) => {

console.log(pageContext)
    const blogData = useStaticQuery(graphql`
    query  { 
        allContentfulCodingLog (
         sort: {
           fields:publishedDate,
           order: DESC
         }
         
       ){ 
           edges { 
             node { 
                title
                slug
                publishedDate (formatString:"MMMM Do, YYYY")
           }
         }
       }
       }
    `);
  

    return (
        <Layout>
            <Head title="Bloger" />
            <div className={blogStyles.wrapper}>
            <div className={blogStyles.wrapperInner}>
                <Breadcrumbs crumbs={ [ '/', 'Bloger' ] } />
                <h1 className={blogStyles.header}>Blog</h1>
                

                <div>  
                {blogData.allContentfulCodingLog.edges.map(({ node }) => {
                    return (
                      <div>
                        <Link to={node.slug}>
                          <h1>{node.title}</h1>
                        </Link>
                        <p>{node.publishedDate}</p>
                      </div>
                    )
                  })}
                  
                </div>
                <ul>
                {Array.from({ length: pageContext.numPages }).map((item, i) => {
                  const index = i + 1
                  const link = index === 1 ? '/blogger' : `/blogger/page/${index}`
                  return (
                    <li>
                      {pageContext.currentPage === index ? (
                        <span>{index}</span>
                      ) : (
                        <a href={link}>{index}</a>
                      )}
                    </li>
                  )
                })}
              </ul>




            </div>
             </div>
        </Layout>
        
    )
}

export default BlogPage;

*/