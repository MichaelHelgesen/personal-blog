import React from "react";
import { Link, graphql, useStaticQuery} from "gatsby";


const IndexBlogData = () => {

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

      const categories = getCategories(blogData.allContentfulBlogPost);



    const Blogdata = () => {
        return (
            
            <div>
                {categories.map((category) => (
                    
                    <div>
                    <p>{category}</p>

                        <ol>
                        {blogData.allContentfulBlogPost.edges.map((item) => (    
                                        item.node.category ? 
                                        
                                            item.node.category[0]["categoryName"] === category ?
                                            <li><Link to={`blog/${item.node.slug}`}><h2>{item.node.title}</h2></Link></li>:    
                                            null
                                            
                                         : 
                                        null 
                                    
                                
                            )
                        )} 
                    </ol>      
                        
                    </div>
                        
                ))}
            </div>
        )
    }
    return (
            <Blogdata />    
        
    )

}

export default IndexBlogData;