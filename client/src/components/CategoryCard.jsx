import React from 'react'

const CategoryCard = ({category,handleCategoryClick}) => {
  return (
    <div>
      <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category)}
          >
            <h3>{category.name}</h3>
          
          </div>

    </div>
  )
}

export default CategoryCard