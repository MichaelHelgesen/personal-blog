import React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery} from "gatsby";

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
            <ol>
                {blogData.allMarkdownRemark.edges.map((item) => (
                        <li>
                            <h2>
                                <Link to={`blog/${item.node.fields.slug}`}>
                                    {item.node.frontmatter.title}
                                </Link>
                            </h2>
                            <p>{item.node.frontmatter.date}</p>
                            <p>{item.node.fields.slug}</p>
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