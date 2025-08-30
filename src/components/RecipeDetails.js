import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function RecipeDetails() {
  const { id } = useParams();
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(AppContext);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const isFavorite =
    recipe && favorites.some((fav) => fav.idMeal === recipe.idMeal);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setRecipe(data.meals ? data.meals[0] : null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading recipe...</p>;
  if (!recipe) return <p className="text-center mt-6">Recipe not found.</p>;

  const categoryColors = {
    Breakfast: "bg-yellow-400",
    Lunch: "bg-green-400",
    Dinner: "bg-orange-400",
    Snack: "bg-purple-400",
    Dessert: "bg-pink-400",
  };
  const badgeColor = categoryColors[recipe.strCategory] || "bg-gray-400";

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Category Badge */}
      {recipe.strCategory && (
        <div
          className={`inline-block px-3 py-1 rounded-full text-white mb-4 ${badgeColor}`}
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
        className={`ml-4 px-3 py-1 rounded-full text-white shadow-lg ${
          isFavorite ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isFavorite ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
      </button>

      <h2 className="text-3xl font-bold my-4 text-center">{recipe.strMeal}</h2>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full rounded mb-6 shadow-lg"
      />

      <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
      <p className="whitespace-pre-line mb-4">{recipe.strInstructions}</p>

      <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
      <ul className="list-disc pl-6 mb-4">
        {Array.from({ length: 20 }).map((_, i) => {
          const ingredient = recipe[`strIngredient${i + 1}`];
          const measure = recipe[`strMeasure${i + 1}`];
          return (
            ingredient &&
            ingredient.trim() && (
              <li key={i}>
                {ingredient} - {measure}
              </li>
            )
          );
        })}
      </ul>

      {recipe.strYoutube && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Video Tutorial:</h3>
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
}
