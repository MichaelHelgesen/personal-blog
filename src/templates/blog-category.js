import Layout from "../components/layout";
import React, {useState} from 'react';
import { Link, graphql } from "gatsby";
import blogStyles from "../pages/blog.module.scss";
import Head from "../components/head";
import Breadcrumbs from "../components/breadcrumb";
import CategorySearch from '../components/categorySearch.js';
import { useFlexSearch } from 'react-use-flexsearch';
import BlogContent from "../components/blogcontent";


const BlogCategory = ({ data, pageContext }) => {
  const { categories } = data
  const { allPosts } = data

  
  const unFlattenResults = results =>
  results.map(post => {
    const { slug, title, category } = post;
    return { node: { slug, title, category } };
  });


  function sortResults (arr) {
    const newArr = [];
    arr.map(function(item){
      if(item.node.category) {
        item.node.category.map(function(element) {
          if(element["categoryName"] === lastWordInUrl) {
            newArr.push(item);
          }
        });
      }
    })
    return newArr;
  }
    
  /*
    const unFlattenResults = results =>
  results.filter(post => {
    if(post.category) {
      post.category.filter(element => {
        if(element["categoryName"] === lastWordInUrl) {
          console.log("SAME CAT")
          const { slug, title, category } = post;
          console.log(post)
          return { node: { slug, title, category } };
        }
      });
    }
  });
  */

  const url = `${typeof window !== 'undefined' ? window.location.href : ''}`
  const lastUrl = url.substr(url.lastIndexOf('/') + 1);
  const lastWordInUrl = lastUrl.charAt(0).toUpperCase() + lastUrl.slice(1)
  
  //const { search } = window.location;
  //const query = new URLSearchParams(search).get('s')
  const [searchQuery, setSearchQuery] = useState('');
  const results = useFlexSearch(searchQuery, data.localSearchPages.index, data.localSearchPages.store);
  
  const [filter, setFilter] = useState("")

  const [blogPosts, setBlogPosts] = useState(categories.edges)
  const [searchedPosts, setSearchedPosts] = useState(unFlattenResults(results))

  let posts = searchQuery ? sortResults(unFlattenResults(results)) : blogPosts;

  const numberOfCategories = function (cat) {
    let num = 0;
    const array = allPosts.edges;
    array.forEach(({node}) => {
      if(node.category) {
        node.category.forEach(catname => {
          if (catname.categoryName === cat) {
            num ++
          }
        })
        
      }
    })
    return num;
  };


  return (
    <Layout>
      <Head title="Kategorier" />
      <div className={blogStyles.wrapper}>
        <div className={blogStyles.wrapperInner}>
          <Breadcrumbs crumbs={['/', 'Blogg', "Kategori"]} />

          <h1 className={blogStyles.header}>#{lastWordInUrl}</h1>

          <CategorySearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setCategories={(searchQuery)}
            posts={posts}
            blogPosts={blogPosts}
            setBlogPosts={setBlogPosts}
            results={results}
            unFlattenResults={unFlattenResults}
            allBlogs={categories.edges}
            setSearchedPosts={setSearchedPosts}
            searchedPosts = {searchedPosts}
            filter={filter}
            setFilter={setFilter}
            category={lastWordInUrl}
          />

          <div className={blogStyles.categorylist}>
            <Link className="blogg" to={`/blogg`}>Alle</Link>
            {pageContext["allCategories"].map((cat,index) => (
              cat === lastWordInUrl ? <Link key={index} className={blogStyles.activecategory} to={`/blogg/kategori/${cat.toLowerCase()}`}>{cat} ({numberOfCategories(cat)})</Link> : <Link key={index} to={`/blogg/kategori/${cat.toLowerCase()}`}>{cat} ({numberOfCategories(cat)})</Link>
            ))}
          </div>
          <div>
            <ol className={blogStyles.posts}>
            <BlogContent test={(posts)}/>
            </ol>
            
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default BlogCategory
export const query = graphql`
  query blogPostsListByCategory($category: String) {
    localSearchPages {
      index
      store
    }
    categories: allContentfulBlogPost (
      sort: {
        fields:publishedDate,
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
      }
    }
  }
  allPosts: allContentfulBlogPost (
    sort: {
      fields:publishedDate,
      order: DESC
    }
    
  ) { 
    edges { 
      node { 
         title
         slug
         publishedDate (formatString:"DD.MM.YY")
         category {categoryName}
         featureImage {
          file {
              url
          }
        }
    }
  }
}
  }
`

/*
<ul className={blogStyles.pagination}>
              {Array.from({ length: pageContext.numPages }).map((item, i) => {
                const index = i + 1
                const link = index === 1 ? '/blogg' : `/blogg/side/${index}`
                return (
                  <li>
                    {pageContext.currentPage === index ? (
                      <span>{index}</span>
                    ) : (
                        <Link to={link}>{index}</Link>
                      )}
                  </li>
                )
              })}
            </ul>
*/