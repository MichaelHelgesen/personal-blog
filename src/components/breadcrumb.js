import React from "react"

import * as breadcrumbStyles from "./breadcrumb.module.scss"
import { Link } from "gatsby"



export default props => {
    return (
        <div className={breadcrumbStyles.breadcrumb}>
            <ul>
                {props.crumbs.map((crumb, index) => (
                    ((props.crumbs.length - index) > 1) ? ((props.crumbs.length - index) === props.crumbs.length) ? <li key={index}><Link to={crumb.toLowerCase()}>Hjem</Link></li>  : <li key={index}><Link to={"/" + crumb.toLowerCase().split(' ').join('_')}>{crumb}</Link></li>  : <li key={index}>{crumb}</li> 
                ))}
            </ul>
            <div style={{ clear: 'both' }}></div>
        </div>
        
    )
}