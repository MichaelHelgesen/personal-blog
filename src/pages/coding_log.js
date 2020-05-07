import React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery} from "gatsby";
import blogStyles from "./blog.module.scss";
import Head from "../components/head";
import Breadcrumbs from "../components/breadcrumb";

const CodingLogPage = () => {

    const codeData = useStaticQuery(graphql`
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
            <ol className={blogStyles.posts}>
                {codeData.allContentfulCodingLog.edges.map((item) => (
                        <li className={blogStyles.post}>
                            <Link to={`coding_log/${item.node.slug}`}>
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
            <Head title="Coding Log"/>
            <Breadcrumbs crumbs={ [ '/', 'Coding Log' ] } />
            <h1 className={blogStyles.header}>Coding Log</h1>
            <Blogdata />
            
        </Layout>
        
    )
}

export default CodingLogPage;