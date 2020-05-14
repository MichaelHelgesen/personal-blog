import React from "react";
import Layout from "../components/layout";
import Head from "../components/head";
import Breadcrumbs from "../components/breadcrumb";
import blogStyles from "./blog.module.scss";

const ContactPage = () => {
    return (
        <Layout>
        <div className={blogStyles.wrapper}>
        <div className={blogStyles.wrapperInner}>
        <Head title="Contact"/>
        <Breadcrumbs crumbs={ [ '/', 'Contact Me' ] } />
        <h1 className={blogStyles.header}>Contact Me</h1>
        <p>Hallo dette er en liten test</p>
        </div>
        </div>
        </Layout>
    )
};

export default ContactPage;