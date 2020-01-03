import React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery} from "gatsby";
import blogStyles from "./blog.module.scss";

const BlogPage = () => {

    const blogData = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
            edges {
                node {
                    frontmatter {
                        title
                        date
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
    `);

    console.log(blogData);

    const Blogdata = () => {
        return (
            <ol className={blogStyles.posts}>
                {blogData.allMarkdownRemark.edges.map((item) => (
                        <li className={blogStyles.post}>
                            <Link to={`blog/${item.node.fields.slug}`}>
                                <h2>
                                    {item.node.frontmatter.title}
                                </h2>
                                <p>{item.node.frontmatter.date}</p>
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