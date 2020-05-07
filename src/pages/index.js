import React from "react";
import { Link, graphql, useStaticQuery} from "gatsby";
import Layout from "../components/layout"
import "../styles/index.scss"
import Head from "../components/head";
import Hero from "../components/hero";
import BlogData from "../components/blogdata"



const IndexPage = () => {
    

    return (
        <Layout>
            <Head title="Home" />
            <Hero />
            <BlogData />
        </Layout>
    )
};

export default IndexPage