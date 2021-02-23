import React from "react";
import { Link } from "gatsby";
import blogStyles from "../pages/blog.module.scss";

const BlogContent = ({test}) => {
    console.log("BLOG-CONTENT-TEST", test);
    
    return (
        test.map(({ node }) => {
            return (
                    <li className={blogStyles.post}>
                        <Link className={blogStyles.bloglink} to={`${node.slug}`}> 
                            
                            <div>
                                <h2>
                                {node.title}
                            </h2>   
                            <p className={blogStyles.date}>{node.publishedDate}
                                
                                {node.category ? "  " : null }

                                {node.category ? 
                                    
                                    node.category.map((cat, index, arr) => (
                                    index === arr.length - 1 ? <Link to={`/blogg/kategori/${cat["categoryName"].toLowerCase()}`}>{"#" + cat["categoryName"]}</Link> : <span><Link to={`/blogg/kategori/${cat["categoryName"].toLowerCase()}`}>#{cat["categoryName"]}</Link>, </span>
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