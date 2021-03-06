import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import footerStyles from "./footer.module.scss"
import { Location } from '@reach/router'
import scrollTo from 'gatsby-plugin-smoothscroll';

const Footer = () => {

    

    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    author
                }
            }
        }
    `)

    return (
        <footer className={footerStyles.footer}>
        <div className={footerStyles.footerwrapper}>
        <button aria-label="Scroll to top" className={footerStyles.totop} onClick={() => scrollTo('#gatsby-focus-wrapper')}></button>
        <Location>
            {({ location }) => {
            return  location.pathname !== "/" ? 
            <div className={footerStyles.description}>
                    <p>Omprogrammerer selvet ved å lese, lære, og skrive. <br />
                    
                     {location.pathname !== "/om" ?
                    <Link to={"/om"}>Bli bedre kjent
                     
                       </Link>
                     : null
                    }
                    </p>
                </div>
            : false;
            }}
        </Location>
        
            <p className={footerStyles.author}>Utviklet av <Link to={"/om"}>{data.site.siteMetadata.author}</Link></p>
        </div>
        </footer>
    )
};

export default Footer