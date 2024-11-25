// src/components/Home.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCategoryStore from "../utils/store";
import Navbar from "../components/Navbar";
import Listbox from "../components/ListBox";
import List from "../components/ListBox";
import TodoCard from "../components/TodoCard";
import CategoryCard from "../components/CategoryCard";
import TodoIndex from "../components/TodoIndex";

const Home = () => {
  const priorities = [
    { id: 1, name: "High" },
    { id: 2, name: "Medium" },
    { id: 3, name: "Low" },
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };


 

  const { categories_data, loading, error, fetchCategories } =
    useCategoryStore();

  useEffect(() => {
    fetchCategories(); // Récupérer les catégories lors du montage du composant
  }, [fetchCategories]);

  if (loading) {
    return (
      <div class="flex space-x-2 justify-center items-center bg-white h-screen ">
        <span class="sr-only">Loading...</span>
        <div class="h-2 w-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div class="h-2 w-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div class="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="container">
      {/* <h1>Welcome to the To-Do App</h1>
  
        <h1>To-Do List</h1> */}
      <div className="categories">
        {categories_data.map((category) => (
          <CategoryCard
            category={category}
            handleCategoryClick={handleCategoryClick}
          />
        ))}
      </div>

      {selectedCategory && (
        <TodoIndex selectedCategory={selectedCategory}   handleCategoryClick={handleCategoryClick}  fetchCategories={fetchCategories} /> 
      )}
    </div>
  );
};

export default Home;
