import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import heroStyles from "./hero.module.scss";


const HeroComponent = () => {




    return (
        <div className={heroStyles.hero}>
                
                <p>Reprogramming my life by <span>reading</span>, <span>writing</span> and learning to <span>code</span></p>
                
        </div>
        
    )

};

export default HeroComponent;