import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import RecipeCard from "../components/RecipeCard";

export default function RecipesPage() {
  const { recipes, loading, error } = useContext(AppContext);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Recipes</h2>

      {loading && <p className="text-center">Loading recipes...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {!loading && !error && recipes.length === 0 && (
        <p className="text-center">No recipes found. Try searching above!</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((meal) => (
          <RecipeCard key={meal.idMeal} recipe={meal} />
        ))}
      </div>
    </div>
  );
}
