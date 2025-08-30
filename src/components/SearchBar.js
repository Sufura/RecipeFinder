// src/components/SearchBar.js
import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [ingredientInput, setIngredientInput] = useState("");
  const { fetchRecipes } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (ingredientInput.trim() === "") return;
    fetchRecipes(ingredientInput);
    navigate("/recipes");
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 mb-6 items-center">
      <input
        type="text"
        placeholder="Enter ingredients (comma separated)..."
        value={ingredientInput}
        onChange={(e) => setIngredientInput(e.target.value)}
        className="border px-3 py-2 rounded w-full md:w-2/3"
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      <button
        onClick={handleSearch}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
}
