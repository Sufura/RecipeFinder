import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/Home";
import RecipesPage from "./pages/Recipes";
import FavoritesPage from "./pages/Favorites";
import RecipeDetails from "./components/RecipeDetails";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Router>
        {/* Navbar */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 flex justify-between items-center shadow-lg">
          <h1 className="text-2xl font-bold cursor-pointer">Recipe Ideas 🍳</h1>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-yellow-200 transition">
              Home
            </Link>
            <Link to="/recipes" className="hover:text-yellow-200 transition">
              Recipes
            </Link>
            <Link to="/favorites" className="hover:text-yellow-200 transition">
              Favorites ❤️
            </Link>
          </div>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
