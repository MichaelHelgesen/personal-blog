import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import layoutStyles from "./layout.module.scss";



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