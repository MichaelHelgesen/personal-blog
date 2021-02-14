import React from "react";
import { graphql, useStaticQuery} from "gatsby";
import Layout from "../components/layout";
import Head from "../components/head";
import Breadcrumbs from "../components/breadcrumb";
import blogStyles from "./blog.module.scss";

const AboutPage = () => {
    
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
                                {item.contentfulid === "Om" ? <p>{heroText[index].text}</p> : null }
                                </div>
                            
                    )
                )}
            </div>
        )
    }

    
    return (
        <Layout>
            <Head title="Om Mikke"/>
            <div className={blogStyles.wrapper}>
          <div className={blogStyles.wrapperInner}>
            <Breadcrumbs crumbs={ [ '/', 'Om' ] } />
            <h1 className={blogStyles.header}>Om meg</h1>
            <HeroData />
            </div>
            </div>
        </Layout>
        
    )
};

export default AboutPage;
