import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";



const Head = ({ title, description }) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)
   
    
    return (
        
        <Helmet htmlAttributes={{ lang : "no" }}>
                <title>{`${title} | ${data.site.siteMetadata.title}`}</title>
                <link rel="canonical" href="https://www.mikkesblogg.no/" />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="description" content={description}/>
        </Helmet>
        
    )
}

export default Head;