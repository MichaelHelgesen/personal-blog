import React from "react";

import * as layoutStyles from "./layout.module.scss";
import Footer from "../components/footer";
import Header from "../components/header";





const Layout = (props) => {
    
    console.log(props)
    return (
        <div className={layoutStyles.container}>
        <div className={layoutStyles.content}>
                <Header />
                {props.children}
            </div>
            
            <Footer custom={props.customFooter ? "custom" : null}/>
            
        </div>
    )
};

export default Layout;