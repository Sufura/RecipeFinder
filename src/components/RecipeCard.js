import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function RecipeCard({ recipe }) {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(AppContext);
  const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);

  const categoryColors = {
    Breakfast: "bg-yellow-400",
    Lunch: "bg-green-400",
    Dinner: "bg-orange-400",
    Snack: "bg-purple-400",
    Dessert: "bg-pink-400",
  };
  const badgeColor = categoryColors[recipe.strCategory] || "bg-gray-400";

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 relative">
      {/* Category Badge */}
      {recipe.strCategory && (
        <div
          className={`absolute top-2 left-2 text-sm px-2 py-1 rounded-full shadow ${badgeColor}`}
        >
          {recipe.strCategory}
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={() =>
          isFavorite
            ? removeFromFavorites(recipe.idMeal)
            : addToFavorites(recipe)
        }
        className={`absolute top-2 right-2 px-3 py-1 rounded-full text-white text-sm shadow-lg ${
          isFavorite ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      {/* Image + Title */}
      <Link to={`/recipes/${recipe.idMeal}`}>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover"
        />
        <h3 className="font-bold text-lg p-2 text-center">{recipe.strMeal}</h3>
      </Link>
    </div>
  );
}
