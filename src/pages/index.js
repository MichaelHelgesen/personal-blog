import React from "react";
import { Link, graphql, useStaticQuery} from "gatsby";
import Layout from "../components/layout"
import "../styles/index.scss"
import Head from "../components/head";
import Hero from "../components/hero";
import BlogData from "../components/blogdata"
import BlogPage from "./blog";
import IndexBlogData from "../components/indexblog";


const IndexPage = ({ pageContext }) => {
    

    return (
        <Layout>
        {console.log("test", pageContext)}
            <Head title="Home" />
            <div className={"wrapper"}>
            <Hero />
            <div className={"innerWrapper"}>
            <IndexBlogData />
            <BlogData />
            </div>
            </div>
        </Layout>
    )
};

export default IndexPage