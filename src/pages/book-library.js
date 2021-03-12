import React, {useState} from 'react';
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Head from "../components/head";
import Breadcrumbs from "../components/breadcrumb";
import blogStyles from "../pages/blog.module.scss";
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from "simple-react-lightbox";
import BookWidget from '../components/bookwidget';








const BookLibrary = ({ data, pageContext }) => {
    const { categories } = data
console.log(categories)
    function getCategories(arr) {
        const uniqueCategories = new Set()
        // Iterate over all articles
        arr.edges.forEach((item) => {
          // Iterate over each category in an article
          uniqueCategories.add(item.node.bokomtale.kategori)
        })
        // Create new array with duplicates removed
        return Array.from(uniqueCategories)
      }

const allCategories = getCategories(categories)
console.log(allCategories)

const test = (e) => {
    setSortCriteria(e.target.value)

    console.log("sortby", sortBy)    
}

const test2 = (e) => {
    setSortIndex(e.target.value)   
}


const [sortBy, setSortCriteria] = useState("lest")
const [sortIndex, setSortIndex] = useState("asc")
//const [sortOrder, setSortOrder] = useState(categories.edges)


const books = categories.edges;
console.log("books", books)

    return (
        <Layout>
            <Head title={"Bibliotek"}/>
            <div className={blogStyles.wrapper}>
          <div className={blogStyles.wrapperInner}>
            <Breadcrumbs crumbs={ [ '/', `Bibliotek`] } />
            <h1 className={blogStyles.header}>Bibliotek</h1>
            
            <div id="buttons" className={blogStyles.dropDowns}>
		<div className={`${blogStyles.selector}`}>
			 <select id="categorySelector" name="Category" onChange={test} onBlur={test}>
				
             <option value="" defaultValue disabled hidden>Select category</option>
				<option value="lest">Lest</option>
				<option value="niv">Nivå</option>
                <option value="sidetall">Sidetall</option>
                <option value="boktittel">Tittel</option>
                <option value="forfatter">Forfatter</option>
				<option value="kategori">Kategori</option>
                <option value="publisert">Publisert</option>
                <option value="evaluering">Score</option>
                
			</select>
		</div>
		<div className={`${blogStyles.selector}`}>
			<select id="orderSelector" name="Order" onChange={test2} onBlur={test2}>
				<option value="asc">Stigende</option>
				<option value="desc">Synkende</option>
			</select>
		</div>
	</div>
            <SimpleReactLightbox>
            <SRLWrapper>
              <div className={blogStyles.library_wrapper}>
              <BookWidget bookdetails={books} sort={sortBy} sortOrder={sortIndex} />
        </div>
            </SRLWrapper>
            </SimpleReactLightbox>
            <button className={blogStyles.showMore}>Show</button>
            </div>
            </div>
        </Layout>
        
    )
  };


  export default BookLibrary;


  export const query = graphql`
  query blogPostsListByCategory2($category: String = "Bokomtale") {
    categories: allContentfulBlogginnlegg (
      sort: {
        fields:bokomtale___lest,
        order: DESC
      }
      filter: { category: { elemMatch: {categoryName: {in: [$category]}}} }
      
    ) { 
      edges { 
        node { 
           title
           slug
           publishedDate (formatString:"DD.MM.YY, ")
           category {categoryName}
           featureImage {
            file {
                url
            }
          }
          bokomtale {
            boktittel
            forfatter
            kategori
            sidetall
            publisert
            niv
            evaluering
            lest (formatString:"DD.MM.YY")
            oppsummering {
              oppsummering
            }
            link
            bilde {
                title
              file {
                url
              }
            }
          }
      }
    }
  }
  
}
`
