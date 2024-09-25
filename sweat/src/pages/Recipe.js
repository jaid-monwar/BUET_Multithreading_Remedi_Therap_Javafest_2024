import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../actions/chatActions";
import RecipeCard from "../components/RecipeCard";
import "../index.css";
import RecipeBanner from "../assets/images/recipe-banner.png";

function Recipe() {
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState("");
  const [inputTexts, setInputTexts] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);

  const handleMessageSend = async () => {
    if (inputTexts.trim() !== "") {
      // Dispatch action to add user message to state immediately
      dispatch({
        type: "SEND_MESSAGE",
        payload: { text: inputTexts, sender: "user" },
      });
      setInputTexts("");
      // setIsGeneratingResponse(true);

      // Send user message to the API
      const responseData = await dispatch(sendMessage(inputTexts));

      // Dispatch action to update state with the response message
      if (responseData) {
        dispatch({ type: "RECEIVE_MESSAGE", payload: responseData.message });
      }

      console.log("working");

      // setIsGeneratingResponse(false);
    }
  };

  useEffect(() => {
    console.log(inputTexts);
  }, [inputTexts]);

  async function onSubmit(data) {
    // update state
    setRecipeText("");
    setRecipeData(data);
    // setInputTexts(data.ingredients + "glob flop");
    setInputTexts(
      "Generate a recipe that incorporates the following details: " +
        `[Ingredients: ${data.ingredients}]` +
        `[Meal Type: ${data.mealType}]` +
        `[Nutritional Goals: ${data.nutrition}]` +
        `[Health Considerations: ${data.health}]` +
        `[Cuisine Preference: ${data.cuisine}]` +
        `[Cooking Time: ${data.cookingTime}]` +
        `[Complexity: ${data.complexity}]` +
        " Please provide a detailed recipe, including steps for preparation and cooking. Only use the ingredients provided." +
        " The recipe should highlight the fresh and vibrant flavors of the ingredients." +
        " Please make sure to include the nutritional information for the recipe." +
        " Moreover, keep in mind the health considerations while preparing the recipe. Health considerations should be given high importance along with nutritional benefits and the ingredients provided." +
        " Also give the recipe a suiable name in its local language based on cuisine preference."
    );
  }

  return (
    <div className="font-['Segoe UI'] relative isolate overflow-hidden py-24 sm:py-32">
      <img
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-10"
        src={RecipeBanner}
        alt="recipe-banner"
      />

      <div className="flex flex-row h-full my-4 gap-2 justify-center">
        <RecipeCard onSubmit={onSubmit} handleSendMessage={handleMessageSend} />
        <div className="bg-white w-[400px] h-[800px] text-md text-gray-600 p-4 border rounded-lg shadow-xl whitespace-pre-line overflow-y-auto">
          {messages
            .filter((message) => message.sender !== "user")
            .map((message, index) => (
              <div key={index}>{message.text}</div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Recipe;
