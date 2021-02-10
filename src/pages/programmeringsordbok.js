import React from "react";
import { Link, graphql, useStaticQuery} from "gatsby";
import Layout from "../components/layout";
import Head from "../components/head";
import Breadcrumbs from "../components/breadcrumb";
import blogStyles from "./blog.module.scss";

const ProgrammingPage = () => {
    
    const heroData = useStaticQuery(graphql`
    query {
        allContentfulHeroTexts {
        nodes {
          contentfulid
          text {
            text
          }
        }
      }
      
    }
    `);

    let heroText = heroData.allContentfulHeroTexts.nodes.map((item) =>
        item.text
    )
 
    
    const HeroData = () => {
        return (
            <div>
                {heroData.allContentfulHeroTexts.nodes.map((item, index) => (
                                <div>
                                {item.contentfulid === "Programmeringsordbok" ? <p>{heroText[index].text}</p> : null }
                                </div>
                            
                    )
                )}
            </div>
        )
    }

    
    return (
        <Layout>
            <Head title="Programmeringsordbok"/>
            <div className={blogStyles.wrapper}>
          <div className={blogStyles.wrapperInner}>
            <Breadcrumbs crumbs={ [ '/', 'Programmeringsordbok' ] } />
            <h1 className={blogStyles.header}>Om meg</h1>
            <HeroData />
            </div>
            </div>
        </Layout>
        
    )
};

export default ProgrammingPage;
