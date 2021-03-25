import React from "react";
import * as blogStyles from "../pages/blog.module.scss";

const Categories = ({blogPosts}) => {
    

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
    
      const categories = getCategories(blogPosts);
      
      if (categories.length !== 0) {
        return (
            <div className={blogStyles.categorylist}>
                {categories.map((category, index) => (
                  <button>{category}</button>
          ))}
              </div>
        )
      } else {
        return (
            <div className={blogStyles.categories}>
            <ul>
                <li>
                  "Ukategorisert"
                </li>
            </ul>
              </div>
        )
      }

    
}

export default Categories;