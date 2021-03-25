import React from "react";

import "../styles/index.scss"
import Head from "../components/head";
import Hero from "../components/hero";
import IndexBlogData from "../components/indexblog";
import Layout from "../components/layout"



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