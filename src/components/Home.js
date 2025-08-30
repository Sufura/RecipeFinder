// src/components/Home.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ setSelectedRecipe }) {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([""]);
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    let query = ingredients.filter((i) => i.trim() !== "").join(",");
    if (!query) return;

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
    );
    const data = await res.json();
    setRecipes(data.meals || []);
  };

  const handleRecipeClick = async (id) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    const recipe = data.meals[0];
    setSelectedRecipe(recipe);
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Recipe Finder</h1>

      {/* Ingredient inputs */}
      <div className="mb-4">
        {ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type="text"
            placeholder="Enter ingredient"
            value={ingredient}
            onChange={(e) => {
              const newIngredients = [...ingredients];
              newIngredients[idx] = e.target.value;
              setIngredients(newIngredients);
            }}
            className="border p-2 mr-2 mb-2"
          />
        ))}
        <button
          onClick={() => setIngredients([...ingredients, ""])}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Add Ingredient
        </button>
      </div>

      <button
        onClick={fetchRecipes}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        Search Recipes
      </button>

      {/* Recipe Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
            onClick={() => handleRecipeClick(recipe.idMeal)}
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="font-semibold">{recipe.strMeal}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
