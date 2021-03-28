import React, {useState, useEffect} from "react";

import { Link } from "gatsby";
import ReactMarkdown from 'react-markdown'
import * as styles from "./bookwidget.module.scss";

const BookWidget = ({ bookdetails, sort, sortOrder, bloggkort, numberOfBooks }) => {
console.log("bookwidget", numberOfBooks)

    const formatBookItem = (item) => {
        if (!item.length) return [{ node: { ...item } }]
        return item;
    }

    const bookArray = formatBookItem(bookdetails)

    let sortOrderIsLest = false;

    const formatDate = (date) => {
        let day1 = date.slice(0, 2);
        let month1 = date.slice(3, 5);
        let year1 = date.slice(6);
        let newDate1 = year1 + month1 + day1
        return newDate1
    }

    const sortedBookArray = bookArray.map(i => {
        let day = i.node.bokomtale.lest.slice(0, 2);
        let month = i.node.bokomtale.lest.slice(3, 5);
        let year = i.node.bokomtale.lest.slice(6);
        let newDate = year + month + day

        if (sort === "lest") {
            sort = newDate
            sortOrderIsLest = true;
        }
        return i;
    }).sort(function (a, b) {
        if (sortOrder === "asc") {
            if (a.node.bokomtale[sort] < b.node.bokomtale[sort])
                return -1;
            if (a.node.bokomtale[sort] > b.node.bokomtale[sort])
                return 1;

        } else {
            if (a.node.bokomtale[sort] < b.node.bokomtale[sort])
                return 1;
            if (a.node.bokomtale[sort] > b.node.bokomtale[sort])
                return -1;
        }

        if (formatDate(a.node.bokomtale.lest) < formatDate(b.node.bokomtale.lest))
            return 1;
        if (formatDate(a.node.bokomtale.lest) > formatDate(b.node.bokomtale.lest))
            return -1;
        return 0;

    }).slice(0,numberOfBooks);

    if (sortOrder === "desc" && sortOrderIsLest) {
        sortedBookArray.reverse();
    }


    const [hasNavTag, setHasNavTag] = useState(false);


    useEffect(() => setHasNavTag(document.querySelector("body") != null), [] );
    

    if (hasNavTag) {
        // Listen for all clicks on the document
    const site = document.querySelector("body");
    site.addEventListener('click', function (event) {


        // If the click happened inside the the container, bail
        if (event.target.closest(".comment") || event.target.closest(".comment-btn")) {

            console.log("INNE I TING")
            return
        };

        // Otherwise, run our code...
        const openComments = document.querySelectorAll(`.${styles.open_comment}`)
        console.log(openComments)
        openComments.forEach(function (com) {
            com.classList.remove(`${styles.open_comment}`);
            com.classList.add(`${styles.close_comment}`);
        })
    }, false);
    }

    const showComment = (e) => {
        const openComments = document.querySelectorAll(`.${styles.open_comment}`)
        console.log("opencomments", openComments)
        openComments.forEach(function (com) {
            com.classList.remove(`${styles.open_comment}`);
            com.classList.add(`${styles.close_comment}`);
        })

        const elem = e.target.parentElement.parentElement;
        console.log(elem);
        const comments = elem.querySelector(".comment");
        comments.style.display = "block";
        comments.classList.remove(`${styles.close_comment}`);
        comments.classList.add(`${styles.open_comment}`);
    }

    const closeComment = (e) => {
        const elem = e.target.parentElement.parentElement;
        console.log(elem);
        const comments = elem.querySelector(".comment");
        comments.style.display = "block";
        comments.classList.remove(`${styles.open_comment}`);
        comments.classList.add(`${styles.close_comment}`);
    }
console.log(sortedBookArray);

    return (
        sortedBookArray.map(({ node }, index) => {
            console.log("NOOOOOOOODDDDEEEE", node)
            return (

                <div className={styles.book__item} key={index}>

                    <div className={styles.book__image}>
                        <span className={styles.helper}></span>
                    
                        <img src={node.bokomtale.bilde.fluid.src} alt={node.bokomtale.bilde.title} />
                    </div>

                    <div className={styles.book__data}>

                        <div className={styles.book__top}>
                            <div className={styles.book__title}>
                                <h3>{node.bokomtale.boktittel}</h3>
                                <div className={styles.book__author}>
                                    <span className={styles.span__by}>av</span>  <span> {node.bokomtale.forfatter}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.data}>
                            kategori<span>{node.bokomtale.kategori}</span>
                        </div>
                        <div className={styles.data}>
                            publisert<span>{node.bokomtale.publisert}</span>
                        </div>
                        <div className={styles.data}>
                            sider<span>{node.bokomtale.sidetall}</span></div>
                        <div className={styles.data}>
                            nivå<span>{node.bokomtale.niv}</span>
                        </div>
                        <div className={styles.data}>
                            score<span>{node.bokomtale.evaluering}</span>
                        </div>
                        <div className={`${styles.data} ${styles.book__registered}`}>
                            lest<span>{node.bokomtale.lest}</span>
                        </div>
                        <Link to={bloggkort ? `/book-library` : `/blogg/${node.slug}`}>
                        <div className={`${styles.data} ${styles.book__link}`}>

                            <span>{bloggkort ? "Se bibliotek" : "Omtale"}</span>
                        </div></Link>
                        
                        <div className={`${styles.data} ${styles.book__comment_btn} comment-btn`} onClick={showComment} onKeyDown={showComment} role="button" tabIndex="-1">

                            <span>Sammendrag</span>
                        </div>
                        
                        <div className={`${styles.comment__wrapper} comment`}>
                            <div className={styles.book__comment}>

                                <ReactMarkdown>{node.bokomtale.oppsummering.oppsummering}</ReactMarkdown>

                            </div>
                            <button className={styles.btn__close_comment} onClick={closeComment}>Lukk</button>
                        </div>

                    </div>

                </div>

            )
            
        }))
}


export default BookWidget;


