import React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery} from "gatsby";
import blogStyles from "./blog.module.scss";

const BlogPage = () => {

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
                publishedDate (formatString:"MMMM Do, YYYY")
           }
         }
       }
       }
    `);

    const Blogdata = () => {
        return (
            <ol className={blogStyles.posts}>
                {blogData.allContentfulBlogPost.edges.map((item) => (
                        <li className={blogStyles.post}>
                            <Link to={`blog/${item.node.slug}`}>
                                <h2>
                                    {item.node.title}
                                </h2>
                                <p>{item.node.publishedDate}</p>
                            </Link>
                            
                        </li>
                    )
                )}
            </ol>
        )
    }

    return (
        <Layout>
            <h1>Blog</h1>
            <Blogdata />
            
        </Layout>
        
    )
}

export default BlogPage;