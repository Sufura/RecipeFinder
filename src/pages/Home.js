import SearchBar from "../components/SearchBar";

export default function HomePage() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-800">
        Welcome to Recipe Ideas 🍲
      </h1>
      <p className="mb-6 text-gray-600 text-center max-w-xl">
        Enter ingredients you have at home and discover delicious recipes.
      </p>

      <div className="w-full max-w-md">
        <SearchBar />
      </div>
    </div>
  );
}
