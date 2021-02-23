import Layout from "../components/layout";
import React, { useState } from 'react';
import { Link, graphql } from "gatsby";
import Breadcrumbs from "../components/breadcrumb";
import blogStyles from "../pages/blog.module.scss";
import Head from "../components/head";
import Search from '../components/search';
import { useFlexSearch } from 'react-use-flexsearch';
import BlogContent from "../components/blogcontent";
import Categories from "../components/createcategory";
import FilterButton from "../components/filterbutton";

const BlogPostList = ({ data, pageContext }) => {
  const { allContentfulBlogPost } = data;



  const unFlattenResults = results =>
    results.map(post => {
      const { slug, title, category } = post;
      return { node: { slug, title, category } };
    });

  const { search } = window.location;
  const query = new URLSearchParams(search).get('s')
  const [searchQuery, setSearchQuery] = useState(query || '');
  const results = useFlexSearch(searchQuery, data.localSearchPages.index, data.localSearchPages.store);
  
  const [filter, setFilter] = useState("")

  const [blogPosts, setBlogPosts] = useState(allContentfulBlogPost.edges)
  const [searchedPosts, setSearchedPosts] = useState(unFlattenResults(results))

  let posts = searchQuery ? (searchedPosts.length ? searchedPosts : unFlattenResults(results)) : blogPosts;


  function getCategories(blogPosts) {
    const uniqueCategories = new Set()
    // Iterate over all articles
    blogPosts.edges.forEach(({ node }) => {
      // Iterate over each category in an article
      if (node.category) {
          node.category.forEach(categoryName => {
          uniqueCategories.add(categoryName["categoryName"]);
        })
      }
    })
    // Create new array with duplicates removed
    return Array.from(uniqueCategories)
  }

  let categories = getCategories(allContentfulBlogPost);


  return (
    <Layout>
      <Head title="Blogg" />

      <div className={blogStyles.wrapper}>
        <div className={blogStyles.wrapperInner}>
          <Breadcrumbs crumbs={['/', 'Blogg']} />
          <h1 className={blogStyles.header}>Blogg</h1>

          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setCategories={(searchQuery)}
            posts={posts}
            blogPosts={blogPosts}
            setBlogPosts={setBlogPosts}
            results={results}
            unFlattenResults={unFlattenResults}
            allBlogs={allContentfulBlogPost.edges}
            setSearchedPosts={setSearchedPosts}
            searchedPosts = {searchedPosts}
            filter={filter}
            setFilter={setFilter}
          />

          <FilterButton 
          setBlogPosts={setBlogPosts}
          searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setCategories={(searchQuery)}
            posts={posts}
            searchQuery={searchQuery}
            blogPosts={blogPosts}
            setBlogPosts={setBlogPosts}
            results={results}
            unFlattenResults={unFlattenResults}
            allBlogs={allContentfulBlogPost.edges}
            setSearchedPosts={setSearchedPosts}
            searchedPosts = {searchedPosts}
            filter={filter}
            setFilter={setFilter}
          />

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



export default BlogPostList
export const query = graphql`
  query blogPostsList {
    localSearchPages {
      index
      store
    }
    allContentfulBlogPost (
      sort: {
        fields:publishedDate,
        order: DESC
      }
      
    ) { 
      edges { 
        node { 
           title
           slug
           publishedDate (formatString:"DD.MM.YY,")
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

export const query = graphql`
  query blogPostsList($skip: Int!, $limit: Int!) {
    localSearchPages {
      index
      store
    }
    allContentfulBlogPost (
      sort: {
        fields:publishedDate,
        order: DESC
      }
      limit: $limit
      skip: $skip
    ) { 
      edges { 
        node { 
           title
           slug
           publishedDate (formatString:"DD.MM.YY,")
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