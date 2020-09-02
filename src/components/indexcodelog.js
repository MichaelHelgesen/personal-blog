import React from "react";
import { Link, graphql, useStaticQuery} from "gatsby";
import blogStyles from "../components/indexblog.module.scss";



const IndexCodingLog = () => {

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
            <div className={blogStyles.section}>
                    <div className={blogStyles.section}>
                    <h2>Coding log</h2>

                      <ol className={blogStyles.list}>
                      {blogData.allContentfulCodingLog.edges.map(({ node }, index) => {
                        return (
                          <li className={blogStyles.post}>
                          <Link to={`coding_log/${node.slug}`}> 
                                
                          <div>
                          <p className={blogStyles.date}>{node.publishedDate}</p>
                              <h3>
                                  {node.title}
                              </h3>   
                              
                          </div>
                      </Link>
                      </li>
                        )
                      }).slice(0,3)
                    }

                    <li className={blogStyles.readmore}><Link to={`coding_log/`}>More in Coding Log
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
                   </div>     
                
            </div>
        )
    }
    return (
            <Blogdata />    
        
    )

}

export default IndexCodingLog;


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