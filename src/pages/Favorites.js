import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import RecipeCard from "../components/RecipeCard";

export default function FavoritesPage() {
  const { favorites } = useContext(AppContext);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Your Favorite Recipes ❤️
      </h2>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((meal) => (
            <RecipeCard key={meal.idMeal} recipe={meal} />
          ))}
        </div>
      ) : (
        <p className="text-center">You haven't added any favorites yet.</p>
      )}
    </div>
  );
}
