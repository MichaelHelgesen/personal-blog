import React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery} from "gatsby";
import blogStyles from "../pages/blog.module.scss";

const BlogData = () => {

    const blogData = useStaticQuery(graphql`
    query { 
        allContentfulBlogPost (
         sort: {
           fields:publishedDate,
           order: DESC
         }
       ){ 
           edges { 
             node { 
                title
                slug
                category {categoryName}
                publishedDate (formatString:"MMMM Do, YYYY")
                featureImage {
                    file {
                        url
                    }
                  }
           }
         }
       }
       }
    `);


    const featuredImages = blogData.allContentfulBlogPost.edges.map((item) => 
        item.node.featureImage
    )

   



    function getCategories(blogPosts) {
        const uniqueCategories = new Set()
        // Iterate over all articles
        blogPosts.edges.forEach(({ node }) => {
          // Iterate over each category in an article
          if (node.category) {
            node.category.forEach(categoryName => {
                uniqueCategories.add(categoryName["categoryName"])
          })
          }
        })
        // Create new array with duplicates removed
        return Array.from(uniqueCategories)
      }




    const Blogdata = () => {
        
        return (
            <ol className={blogStyles.posts}>
                {blogData.allContentfulBlogPost.edges.map((item, index) => (    
                        <li className={blogStyles.post}>
                            <Link to={`blogg/${item.node.slug}`}> 
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
            </ol>
        )
    }
    return (
            <Blogdata />    
        
    )

}

export default BlogData;