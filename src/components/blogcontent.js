import React from "react";
import { Link } from "gatsby";
import * as blogStyles from "../components/blogcontent.module.scss";

const BlogContent = ({test}) => {    
    return (
        test.map(({ node }, index) => {
            return (
                    <li className={blogStyles.post} key={index}>
                        <Link to={`/blogg/${node.slug}`}> 
                            
                            <div>
                                <h2>
                                {node.title}
                            </h2>   
                            <p>{node.publishedDate}
                                
                                {node.category ? "  " : null }

                                {node.category ? 
                                    
                                    node.category.map((cat, index, arr) => (
                                    index === arr.length - 1 ? <span key={index}>{"#" + cat["categoryName"]}</span> : <span key={index}>#{cat["categoryName"]}, </span>
                                ))
                                    :
                                null
                                }
                                                                
                                    </p>
                            </div>
                        </Link>    
                    </li>
            )
        })
    )
}
 
export default BlogContent;