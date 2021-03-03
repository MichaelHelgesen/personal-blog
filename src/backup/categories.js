import React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery} from "gatsby";
import blogStyles from "./blog.module.scss";
import Head from "../components/head";
import Breadcrumbs from "../components/breadcrumb";

const CategoryPage = () => {

    const codeData = useStaticQuery(graphql`
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
                publishedDate (formatString:"MMMM Do, YYYY")
           }
         }
       }
       }
    `);

    const Blogdata = () => {
        return (
            <ol className={blogStyles.posts}>
                {codeData.allContentfulCodingLog.edges.map((item) => (
                        <li className={blogStyles.post}>
                            <Link to={`categories/${item.node.slug}`}>
                                <div>
                                    <h2>
                                        {item.node.title}
                                    </h2>
                                
                                    <p>{item.node.publishedDate}</p>
                                </div>
                            </Link>
                            
                        </li>
                    )
                )}
            </ol>
        )
    }

    return (
        <Layout>
            <Head title="Categories"/>
            <div className={blogStyles.wrapper}>
            <div className={blogStyles.wrapperInner}>
            <Breadcrumbs crumbs={ [ '/', 'Categories' ] } />
            <h1 className={blogStyles.header}>Categories</h1>
            <Blogdata />
            </div>
            </div>
        </Layout>
        
    )
}

export default CategoryPage;