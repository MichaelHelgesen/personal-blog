import React from 'react';
import blogStyles from "../pages/blog.module.scss";

const FilterButton = ({ filter, setFilter, setBlogPosts, setSearchedPosts, allBlogs, searchQuery, results, unFlattenResults }) => {
    
    

    function getCategories(array) {
        const uniqueCategories = new Set()
        // Iterate over all articles
        array.forEach(({ node }) => {
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
    
        function handleClick(e) {
            
          e.preventDefault();

          const array = (searchQuery ? unFlattenResults(results) : allBlogs);

            if(e.target.classList.contains(blogStyles.active)){
                e.target.classList.remove(blogStyles.active);
                e.target.classList.add("default")
                setBlogPosts(allBlogs)
                setSearchedPosts(unFlattenResults(results))
                setFilter("");
          isActive(filter)
            } else {
               
          const test = array.filter(function(item) {
              let match = "";
            if (item.node.category) {
                 item.node.category.forEach(el => {
                    if(el["categoryName"] === e.target.innerText.substr(0,e.target.innerText.indexOf(' '))) {
                        match = item
                    } 
                });
            }
            return match;
          })
          
          setBlogPosts(test)
          setSearchedPosts(test)
          setFilter(e.target.innerText.substr(0,e.target.innerText.indexOf(' ')));
          isActive(filter)

            }
          
        }
        
        function isActive(value){
            return ((value===filter) ? blogStyles.active : 'default' );
          }

 
          const numberOfCategories = function (cat) {
            let num = 0;
            const array = (searchQuery ? unFlattenResults(results) : allBlogs);
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


      const categories = getCategories((searchQuery ? unFlattenResults(results) : allBlogs));
      if (categories.length !== 0) {
        return (
            <div className={blogStyles.categorylist}>
                {categories.map((category, index) => (
                  <button 
                  key={index}
                  onClick={handleClick}
                  className={isActive(category)}
                  >{category + " (" + numberOfCategories(category) + ")"}</button>
          ))}
              </div>
        )
      } else {
        return (
            <div className={blogStyles.categorylist}>
            <h3>Beklager, ingen treff</h3>
              </div>
        )
      }
      
}

export default FilterButton;