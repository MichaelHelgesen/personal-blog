import React from "react";
import Layout from "../components/layout"
import "../styles/index.scss"
import Head from "../components/head";
import Hero from "../components/hero";
import IndexBlogData from "../components/indexblog";


const IndexPage = () => {
    

    return (
        <Layout>
            <Head title="Hjem" description="En personlig blogg om læring og programmering."/>
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