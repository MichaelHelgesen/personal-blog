import Layout from "../components/layout";
import React from 'react';
import { Link, graphql } from "gatsby";
import blogStyles from "../pages/blog.module.scss";
import Head from "../components/head";
import breadcrumbStyles from "../components/breadcrumb.module.scss"


const BlogCategory = ({ data, pageContext }) => {
  const { allContentfulBlogPost } = data
  const featuredImages = allContentfulBlogPost.edges.map((item) => 
  item.node.featureImage
)
const url = window.location.href;
const lastUrl = url.substr(url.lastIndexOf('/') + 1);
const lastWordInUrl = lastUrl.charAt(0).toUpperCase() +  
lastUrl.slice(1)
  return (
    <Layout>
    <Head title="Categories" />
    
    <div className={blogStyles.wrapper}>
    <div className={blogStyles.wrapperInner}>
        
        <div className={breadcrumbStyles.breadcrumb}>
        <ul>
          <li>
          <Link to={"/"}>Home</Link>
          </li>
          <li>
          <Link to={"/blog"}>Blog</Link>
          </li>
          <li>
          <Link to={"/blog/category"}>Category</Link>
          </li>
          <li>{lastWordInUrl}</li>
        </ul>
        </div>
        
        <h1 className={blogStyles.header}>{lastWordInUrl}</h1>
        {pageContext.allCategories.map(cat => (

            <Link to={`/blog/category/${cat.toLowerCase()}`}>{cat}</Link>
          ))}

    <div>
    <ol className={blogStyles.posts}>
      {allContentfulBlogPost.edges.map(({ node }, index) => {
        return (
                  <li className={blogStyles.post}>
                      <Link to={`blog/${node.slug}`}> 
                          {node.featuredImages ? null : null }
                          
                          {featuredImages[index] ? <div className={blogStyles.featuredImage} style={{
                              height: "250px",
                              background: "url(" + featuredImages[index]["file"]["url"] + ") no-repeat center center",
                              '-webkit-background-size': "cover",
                              '-moz-background-size': "cover",
                              '-o-background-size': "cover",
                              'background-size': "cover"
                          }}></div> : null }
                          <div>
                              <h2>
                                  {node.title}
                              </h2>   
                              <p className={blogStyles.date}>{node.publishedDate}</p>
                          </div>
                          <div>
                          {node.category ? 
                            node.category.map((cat, index, arr) => (
                            
                              <Link to={`/blog/category/${cat["categoryName"].toLowerCase()}`}>{cat["categoryName"]}</Link>
                            
                          ))
                            :
                          null
                          }
                          
                          </div>
                      </Link>    
                  </li>
        )
      })}
      </ol>
      <ul>
                {Array.from({ length: pageContext.numPages }).map((item, i) => {
                  const index = i + 1
                  const link = index === 1 ? '/blog' : `/blog/page/${index}`
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
export default BlogCategory
export const query = graphql`
  query blogPostsListByCategory($category: String) {
    allContentfulBlogPost (
      sort: {
        fields:publishedDate,
        order: DESC
      }
      filter: { category: { elemMatch: {categoryName: {in: [$category]}}} }
      
    ) { 
      edges { 
        node { 
           title
           slug
           publishedDate (formatString:"MMMM Do, YYYY")
           category {categoryName}
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