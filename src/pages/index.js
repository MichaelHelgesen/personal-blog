import React from "react";
import Layout from "../components/layout"
import "../styles/index.scss"
import Head from "../components/head";
import Hero from "../components/hero";
/*import BlogData from "../components/blogdata"*/
/*import BlogPage from "./blog";*/
import IndexBlogData from "../components/indexblog";
import IndexCodeLog from "../components/indexcodelog";


const IndexPage = () => {
    

    return (
        <Layout>
            <Head title="Hjem" />
            <div className={"wrapper"}>
            <Hero />
            <div className={"innerWrapper"}>
            <IndexBlogData />
            
            </div>
            </div>
        </Layout>
    )
};

export default IndexPage