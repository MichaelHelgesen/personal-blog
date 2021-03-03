import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";



const Head = ({ title }) => {
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
                <link rel="canonical" href="https://mikkesblogg.no" />
                < meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" charSet="utf-8"/>
            </Helmet>
        
    )
}

export default Head;