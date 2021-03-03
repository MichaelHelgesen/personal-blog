import React from "react";
import { graphql, useStaticQuery} from "gatsby";
import { Link } from "gatsby";
import headerStyles from "./header.module.scss";



const HeaderComponent = () => {

    const codeData = useStaticQuery(graphql`
    query {
        allContentfulSider (
            sort: {
         fields:rekkefolge,
         order: ASC
       }
          ) {
            edges {
                node {
                    tittel
                    slug
                  rekkefolge
                }
            }
        }
      }
    `);

/*
const pageMenu = codeData.allSitePage.edges.filter((item) => {
    if (!item.node.isCreatedByStatefulCreatePages && !item.node.path.includes("/blogg")) {
        return item
    }
})
*/


const openMenu = () => {
    const get = element => document.getElementById(element);
    let nav = get("nav");
    nav.classList.add('open-nav');
}

const closeMenu = () => {
    const get = element => document.getElementById(element);
    let nav = get("nav");
    nav.classList.remove('open-nav');
}


    return (
        <header className={headerStyles.header}>
        
                <Link className={headerStyles.title} to="/">
                <span className={headerStyles.logowrapper}>
                    <svg className={headerStyles.logoSvg} id="_x33_0" enableBackground="new 0 0 64 64" height="512" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m27 18c.551 0 1 .448 1 1h2c0-1.654-1.346-3-3-3s-3 1.346-3 3h2c0-.552.449-1 1-1z"/><path d="m35 18c.551 0 1 .448 1 1h2c0-1.654-1.346-3-3-3s-3 1.346-3 3h2c0-.552.449-1 1-1z"/><path d="m36 22v-1h-10v1c0 2.757 2.243 5 5 5s5-2.243 5-5zm-7.829 1h5.657c-.413 1.164-1.525 2-2.829 2s-2.415-.836-2.828-2z"/><path d="m58.21 8c-2.351 0-4.338 1.684-4.725 4.003l-.357 2.141c-1.227.376-2.128 1.507-2.128 2.856v2.343c0 1.336.52 2.592 1.464 3.536l.536.535v5.349c0 1.615-.897 3.067-2.341 3.789-.586.294-1.241.448-1.895.448h-11.944l-.659-3.292c2.303-1.23 4.113-3.256 5.075-5.708h.764c2.206 0 4-1.794 4-4s-1.794-4-4-4v-2.502c2.346-.982 4-3.3 4-5.998 0-3.584-2.916-6.5-6.5-6.5h-11.815c-6.443 0-11.685 5.241-11.685 11.685 0 .955.117 1.909.349 2.835l.509 2.035c-.529.678-.858 1.52-.858 2.445 0 2.206 1.794 4 4 4h.764c.962 2.452 2.771 4.478 5.075 5.708l-.689 3.442-6.148 1.229c-2.292.458-4.36 1.717-5.821 3.542-1.406 1.76-2.181 3.968-2.181 6.221v12.858c0 3.309 2.691 6 6 6h28c1.103 0 2-.897 2-2v-18h2.185c3.983 0 7.773-1.72 10.396-4.718 2.205-2.518 3.419-5.749 3.419-9.097v-16.395c0-2.642-2.148-4.79-4.79-4.79zm-5.21 9c0-.552.449-1 1-1h2c.551 0 1 .448 1 1s-.449 1-1 1h-1v2h1c1.654 0 3-1.346 3-3s-1.346-3-3-3h-.82l.278-1.669c.226-1.351 1.383-2.331 2.752-2.331 1.538 0 2.79 1.252 2.79 2.79v9.21h-6.586l-.535-.535c-.567-.567-.879-1.32-.879-2.122zm-15.766 18-1.653 2.755-2.337-.935 3.033-1.82zm6.766-15c0 1.103-.897 2-2 2h-.191c.12-.65.191-1.316.191-2v-2c1.103 0 2 .897 2 2zm-24 2c-1.103 0-2-.897-2-2s.897-2 2-2v2c0 .684.071 1.35.191 2zm0-7.969v1.969c-.495 0-.964.102-1.402.267l-.309-1.233c-.192-.767-.289-1.557-.289-2.349 0-5.34 4.344-9.685 9.685-9.685h11.815c2.481 0 4.5 2.019 4.5 4.5s-2.019 4.5-4.5 4.5h-1.013c-1.371 0-2.487-1.116-2.487-2.487 0-1.072.684-2.02 1.7-2.358l.616-.205-.632-1.898-.616.206c-1.835.61-3.068 2.32-3.068 4.255 0 .129.027.251.038.377-1.844-.184-3.649-.611-5.379-1.303l-.388-.156c-.716-.286-1.47-.431-2.24-.431-3.325 0-6.031 2.706-6.031 6.031zm2 5.969v-5.969c0-2.222 1.809-4.031 4.031-4.031.515 0 1.019.097 1.496.287l.388.156c2.183.872 4.473 1.365 6.812 1.502.8 1.233 2.183 2.055 3.76 2.055h1.013c.169 0 .334-.013.5-.025v6.025c0 4.963-4.038 9-9 9s-9-4.037-9-9zm9 11c1.142 0 2.244-.176 3.28-.5l.601 3.005-3.881 2.329-3.881-2.329.601-3.005c1.036.324 2.138.5 3.28.5zm-5.183 4.056 2.94 1.764-2.35.94-1.559-2.51zm-2.817 25.944v-2h22v2zm22-4h-22v-14h22zm13.077-20.034c-2.244 2.563-5.485 4.034-8.892 4.034h-26.185c-1.103 0-2 .897-2 2v12h-4v2h4v4h-4c-2.206 0-4-1.794-4-4v-12.858c0-1.8.619-3.565 1.743-4.97 1.167-1.459 2.819-2.465 4.652-2.831l3.358-.672 2.84 4.571 5.318-2.127.089.053.089-.053 5.331 2.132 3.146-5.245h9.198c.962 0 1.927-.228 2.789-.658 2.126-1.063 3.447-3.2 3.447-5.578v-4.764h6v5.185c0 2.863-1.038 5.627-2.923 7.781z"/><path d="m34 53c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3 1.346 3 3 3zm0-4c.551 0 1 .448 1 1s-.449 1-1 1-1-.448-1-1 .449-1 1-1z"/><path d="m11.852 31.839c1.894-1.254 3.148-3.402 3.148-5.839 0-3.859-3.14-7-7-7s-7 3.141-7 7c0 2.437 1.254 4.585 3.148 5.839l.711 3.554c.186.931 1.011 1.607 1.961 1.607h2.36c.95 0 1.775-.676 1.961-1.607zm-8.852-5.839c0-2.757 2.243-5 5-5s5 2.243 5 5c0 2.414-1.721 4.434-4 4.899v-2.083c1.161-.414 2-1.514 2-2.816 0-1.654-1.346-3-3-3s-3 1.346-3 3c0 1.302.839 2.402 2 2.816v2.083c-2.279-.465-4-2.485-4-4.899zm4 0c0-.552.449-1 1-1s1 .448 1 1-.449 1-1 1-1-.448-1-1zm-.18 9-.44-2.197c.521.124 1.062.197 1.62.197s1.099-.073 1.62-.197l-.44 2.197z"/><path d="m7 13h2v4h-2z"/><path d="m2.79 13.837h2v4.001h-2z" transform="matrix(.924 -.383 .383 .924 -5.771 2.655)"/><path d="m10.209 14.837h4.001v2h-4.001z" transform="matrix(.383 -.924 .924 .383 -7.095 21.054)"/></g></svg>
                    </span>
                    <span className={headerStyles.logo}><span className={headerStyles.logofirst}>Mikkes</span><br/><span className={headerStyles.logosecond}>Blogg</span></span>
                </Link>
                <nav>
                     
                    <svg className={headerStyles.menuBtn} onClick={openMenu}  id="menu-btn" viewBox="0 0 27.329 17">
                        <g transform="translate(-415.671 -19)">
                            <line  x1="24.329" transform="translate(417.171 34.5)" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="3"/>
                            <line x1="24.329" transform="translate(417.171 27.5)" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="3"/>
                            <line x1="17" transform="translate(424.5 20.5)" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="3"/>
                        </g>
                    </svg>
                    
                    <ul className={headerStyles.navList} id="nav">
                        <li>
                            <svg id="exit-btn" onClick={closeMenu} onKeyDown={closeMenu} xmlns="http://www.w3.org/2000/svg" width="48.968" height="48.968" viewBox="0 0 48.968 48.968">
                                <g transform="translate(-378.092 -80.939)">
                                    <path id="Path_21" data-name="Path 21" d="M383,82l-46.847,46.847" transform="translate(43)" fill="none" stroke="#000" strokeWidth="3"/>
                                    <path id="Path_22" data-name="Path 22" d="M336.153,82l46.673,46.673" transform="translate(43)" fill="none" stroke="#000" strokeWidth="3"/>
                                </g>
                            </svg>
                        </li>
                        <li>
                            <Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to="/">Hjem</Link>
                        </li>
                        <li>
                        <Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to="/blogg" partiallyActive={true}>Blogg</Link>
                    </li>
                    {
                            codeData.allContentfulSider.edges.map(function (element, index) {
                                  return  (<li key={index}><Link className={headerStyles.navItem} activeClassName={headerStyles.activeNavItem} to={`/${element.node.slug}`}>{element.node.tittel}</Link></li>)
                                
                            })
                        }
                    </ul>
                </nav>
                
                
        </header>
        
    
    )

    

};

/*

*/


export default HeaderComponent;