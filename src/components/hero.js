import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import heroStyles from "./hero.module.scss";


const HeroComponent = () => {




    return (
        <div className={heroStyles.hero}>
                <h1>Reprogramming my life by <span>reading,</span> <span>writing</span> and learning to <span>code</span></h1>
                <Link to={"/about"}>Learn more</Link>
        </div>
        
    )

};

export default HeroComponent;