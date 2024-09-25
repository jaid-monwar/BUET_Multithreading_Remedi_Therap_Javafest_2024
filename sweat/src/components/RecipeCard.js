import React, { useState } from "react";

const RecipeCard = ({ onSubmit, handleSendMessage }) => {
  const [ingredients, setIngredients] = useState("");
  const [mealType, setMealType] = useState("");
  const [nutrition, setNutrition] = useState("");
  const [health, setHealth] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [complexity, setComplexity] = useState("");

  const handleSubmit = () => {
    const recipeData = {
      ingredients,
      mealType,
      nutrition,
      health,
      cuisine,
      cookingTime,
      complexity,
    };
    onSubmit(recipeData);
  };

  return (
    <div className="w-[400px] border rounded-lg overflow-hidden shadow-lg font-['Segoe UI'] bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-6">Let's Build Your Recipe</div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="ingredients"
          >
            Ingredients
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ingredients"
            type="text"
            placeholder="Enter ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="mealType"
          >
            Meal Type
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="mealType"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nutrition"
          >
            Nutritional Goals
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="nutrition"
            type="text"
            placeholder="e.g., low-carb, high-protein"
            value={nutrition}
            onChange={(e) => setNutrition(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="health"
          >
            Health Considerations
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="health"
            type="text"
            placeholder="e.g., diabetes, heart health"
            value={health}
            onChange={(e) => setHealth(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cuisine"
          >
            Cuisine Preference
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="cuisine"
            type="text"
            placeholder="e.g., Italian, Mexican"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cookingTime"
          >
            Cooking Time
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="cookingTime"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          >
            <option value="Less than 30 minutes">Less than 30 minutes</option>
            <option value="30-60 minutes">30-60 minutes</option>
            <option value="More than 1 hour">More than 1 hour</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="complexity"
          >
            Complexity
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="complexity"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="py-4">
          <div className="flex justify-between px-2">
            <button
              className="bg-[#f87474] hover:bg-[#f05454] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-12"
              type="button"
              onClick={handleSubmit}
            >
              Load
            </button>
            <button
              className="bg-[#f87474] hover:bg-[#f05454] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-12"
              type="button"
              onClick={handleSendMessage}
            >
              Generate Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
