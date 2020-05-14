import React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery} from "gatsby";
import blogStyles from "../pages/blog.module.scss";

const BlogListData = () => {


    const blogData = useStaticQuery(graphql`
    query { 
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


   

   








    const Blogdata = () => {
        return (

            


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
              <ul>
              {Array.from({ length: pageContext.numPages }).map((item, i) => {
                const index = i + 1
                const link = index === 1 ? '/test' : `/test/page/${index}`
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
            
            
            
            
            
            /*
            
            <ol className={blogStyles.posts}>
                {blogData.allContentfulBlogPost.edges.map((item, index) => (    
                        <li className={blogStyles.post}>
                            <Link to={`blog/${item.node.slug}`}> 
                                {item.node.featuredImages ? null : null }
                                
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
                                        {item.node.title}
                                    </h2>   
                                    <p className={blogStyles.date}>{item.node.publishedDate}</p>
                                </div>
                            </Link>   
                        </li>
                    )
                )} 
                
            </ol>*/
        )
    }
    return (
            <Blogdata />    
        
    )

}

export default BlogListData;





/*
const BlogPostList = ({ data, pageContext }) => {
  const { allMarkdownRemark } = data
  return (
    <div>
      {allMarkdownRemark.edges.map(({ node }) => {
        const imageSource = node.frontmatter.image.childImageSharp.fluid.src
        return (
          <div>
            <Link to={node.fields.slug}>
              <img src={imageSource} alt={node.frontmatter.title} />
              <h1>{node.frontmatter.title}</h1>
            </Link>
            <p>{node.frontmatter.date}</p>
            <p>By {node.frontmatter.author}</p>
            <p>In: {node.frontmatter.category.join()}</p>
          </div>
        )
      })}
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
  )
}
export default BlogPostList
export const query = graphql`
query { 
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
`
*/