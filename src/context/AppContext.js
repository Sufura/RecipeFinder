// src/context/AppContext.js
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch recipes by multiple ingredients (intersect results)
  const fetchRecipes = async (ingredientInput) => {
    if (!ingredientInput.trim()) return;

    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      // Split into ingredients array
      const ingredients = ingredientInput
        .split(/[, ]+/)
        .map((i) => i.trim().toLowerCase())
        .filter(Boolean);

      if (ingredients.length === 0) return;

      let results = [];

      for (let i = 0; i < ingredients.length; i++) {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients[i]}`
        );
        const data = await res.json();

        if (!data.meals) {
          results = []; // if any ingredient has no meals → no match
          break;
        }

        const meals = data.meals;

        if (i === 0) {
          results = meals; // first ingredient → base set
        } else {
          // intersect with existing results
          results = results.filter((meal) =>
            meals.some((m) => m.idMeal === meal.idMeal)
          );
        }

        if (results.length === 0) break; // stop early if no matches
      }

      if (results.length === 0) {
        setError("No recipes found with those ingredients.");
        setRecipes([]);
      } else {
        setRecipes(results);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching recipes.");
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (recipe) => {
    if (!favorites.find((fav) => fav.idMeal === recipe.idMeal)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((fav) => fav.idMeal !== id));
  };

  return (
    <AppContext.Provider
      value={{
        recipes,
        favorites,
        loading,
        error,
        fetchRecipes,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
