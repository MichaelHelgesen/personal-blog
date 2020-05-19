import React from "react";
import Layout from "../components/layout";
import { Link, graphql, useStaticQuery} from "gatsby";
import Breadcrumbs from "../components/breadcrumb";
import blogStyles from "./blog.module.scss";
import Head from "../components/head";
import BlogData from "../components/blogdata"

const BlogPage = () => {

    
  

    return (
        <Layout>
            <Head title="Blog" />
            <div className={blogStyles.wrapper}>
            <div className={blogStyles.wrapperInner}>
                <Breadcrumbs crumbs={ [ '/', 'Blog' ] } />
                <h1 className={blogStyles.header}>Blog</h1>
                <BlogData />
            </div>
             </div>
        </Layout>
        
    )
}

export default BlogPage;