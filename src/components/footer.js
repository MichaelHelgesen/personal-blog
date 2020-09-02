import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import footerStyles from "./footer.module.scss"
import { Location } from '@reach/router'
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
        <Location>
            {({ location }) => {
            console.log(location.pathname)
            return  location.pathname !== "/" ? 
            <div className={footerStyles.description}>
                    <p>Reprogramming my life by reading, writing and learning to code. <br />
                    
                     {location.pathname !== "/about" ?
                    <Link to={"/about"}>Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 100">
                         <defs>
                           <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                           refX="0" refY="3.5" orient="auto">
                             <polygon points="0 0, 10 3.5, 0 7" />
                           </marker>
                         </defs>
                         <line x1="0" y1="50" x2="120" y2="50" stroke="#000" 
                         stroke-width="8" marker-end="url(#arrowhead)" />
                       </svg>  
                       </Link>
                     : null
                    }
                    </p>
                </div>
            : false;
            }}
        </Location>
            <p className={footerStyles.author}>Created by <Link to={"/about"}>{data.site.siteMetadata.author}</Link></p>
        </div>
        </footer>
    )
};

export default Footer