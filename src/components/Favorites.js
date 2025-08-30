import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import RecipeCard from "./RecipeCard";

export default function Favorites() {
  const { favorites } = useContext(AppContext);
  if (favorites.length === 0) return <p className="p-4">No favorites yet!</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {favorites.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
}
