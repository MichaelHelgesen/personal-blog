import React from "react";
import Layout from "../components/layout";
import Head from "../components/head";
import Breadcrumbs from "../components/breadcrumb";
import blogStyles from "./blog.module.scss";

const ContactPage = () => {
    return (
        <Layout>
        <Head title="Contact"/>
        <Breadcrumbs crumbs={ [ '/', 'Contact Me' ] } />
        <h1 className={blogStyles.header}>Contact Me</h1>
        </Layout>
    )
};

export default ContactPage;