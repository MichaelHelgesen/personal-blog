import React from "react";

import * as blogStyles from "../components/indexblog.module.scss";
import { Link, graphql, useStaticQuery} from "gatsby";




const IndexBlogData = () => {

    const blogData = useStaticQuery(graphql`
    query { 
      allContentfulBlogginnlegg (
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
                publishedDate (formatString:"DD.MM.YY")
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


    blogData.allContentfulBlogginnlegg.edges.map(function (item) {
        if (!item.node.category) {
          item.node.category = []
             item.node.category.push({categoryName:"Ukategorisert"})
        }
        return null
      })


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

      const categories = getCategories(blogData.allContentfulBlogginnlegg);

      const filterCategories = blogData.allContentfulBlogginnlegg.edges.filter(function(item) {
        if (item.node.category) {
          return true; // skip
        }
        return false;
      })

      const numberOfCategories = function (cat) {
        let num = 0;
        const array = blogData.allContentfulBlogginnlegg.edges;
        array.forEach(({node}) => {
          if(node.category) {
            node.category.forEach(catname => {
              if (catname.categoryName === cat) {
                num ++
              }
            })
            
          }
        })
        return num;
      };


    const Blogdata = () => {

      return (
            
        

            <div>

<p className={blogStyles.introtext}>Siste blogginnlegg</p>

                {categories.map((category, index) => (
                    
                    <div className={blogStyles.section} key={index}>
                    <h2 className={blogStyles.categorytitle}>#{category} ({numberOfCategories(category)})</h2>

                        <ol className={blogStyles.list}>

                        {filterCategories.filter(function(test) { 
                          let testing = false
                          test.node.category.map(function(cat) {
                            if (cat["categoryName"] === category) {
                              testing = true
                            }
                             return null;
                          })
                          return testing
                         }).map(function(post, index) {
                           return <li className={blogStyles.post} key={index}>
                            <Link to={`blogg/${post.node.slug}`}> 
                                
                                <div>
                                
                                    <h3>
                                        {post.node.title}
                                    </h3>   
                                    <p>{post.node.publishedDate}</p>
                                </div>
                            </Link>    
                        </li>
                         }).slice(0,3)}                       

                         <li className={blogStyles.readmore}><Link to={`blogg/kategori/${category.toLowerCase()}`}>Mer i {category.toLowerCase()} 
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 100">
                         <defs>
                           <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                           refX="0" refY="3.5" orient="auto">
                             <polygon points="0 0, 10 3.5, 0 7" />
                           </marker>
                         </defs>
                         <line x1="0" y1="50" x2="120" y2="50" stroke="#000" 
                         strokeWidth="8" markerEnd="url(#arrowhead)" />
                       </svg>                         
                         </Link></li>
                        
                    </ol>      
                        
                    </div>
                        
                ))}
            </div>
        )
    }
    return (
            <div>
            <Blogdata />    
            <div className={blogStyles.linkwrap}>
            <Link className={blogStyles.buttonlink} to={"/blogg"}>Se alle blogginnlegg</Link>
            </div>
            </div>
    )

}

export default IndexBlogData;