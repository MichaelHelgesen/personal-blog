import React from "react";
import { Link, graphql, useStaticQuery} from "gatsby";
import blogStyles from "../components/indexblog.module.scss";



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

      const filterCategories = blogData.allContentfulBlogPost.edges.filter(function(item) {
        if (item.node.category) {
          return true; // skip
        }
        return false;
      })


    const Blogdata = () => {
      
      


      return (
            
            <div>
                {categories.map((category) => (
                    
                    <div className={blogStyles.section}>
                    <h2>{category}</h2>

                        <ol className={blogStyles.list}>

                        {filterCategories.filter(function(test) { 
                          let testing = false
                          test.node.category.map(function(cat) {
                            if (cat["categoryName"] === category) {
                              testing = true
                            }
                             
                          })
                          return testing
                         }).map(function(post, index) {
                           return <li className={blogStyles.post}>
                            <Link to={`blog/${post.node.slug}`}> 
                                
                                <div>
                                <p className={blogStyles.date}>{post.node.publishedDate}</p>
                                    <h3>
                                        {post.node.title}
                                    </h3>   
                                    
                                </div>
                            </Link>    
                        </li>
                         }).slice(0,3)}                       

                         <li className={blogStyles.readmore}><Link to={`blog/category/${category.toLowerCase()}`}>More in {category} 
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 100">
                         <defs>
                           <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                           refX="0" refY="3.5" orient="auto">
                             <polygon points="0 0, 10 3.5, 0 7" />
                           </marker>
                         </defs>
                         <line x1="0" y1="50" x2="120" y2="50" stroke="#000" 
                         stroke-width="8" marker-end="url(#arrowhead)" />
                       </svg>                         
                         </Link></li>
                        
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


/*

{blogData.allContentfulBlogPost.edges.map(function(item, index) {    
                          
                          if (item.node.category) {
                            
                            item.node.category.map(function(cat) {
                              if ((cat["categoryName"] === category)) {
                                  return <li><Link to={`blog/${item.node.slug}`}><h2>{item.node.title}</h2></Link></li>
                              }
                             
                            }) 

                          }
                          
                          
                           

                        })} 

*/