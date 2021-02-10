import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import heroStyles from "./hero.module.scss";


const HeroComponent = () => {




    return (
        <div className={heroStyles.hero}>
                <h1>Omprogrammerer selvet ved å <span>lese,</span> <span>lære,</span> og <span>skrive</span></h1>
                <Link to={"/om"}>Bli bedre kjent</Link>
        </div>
        
    )

};

export default HeroComponent;