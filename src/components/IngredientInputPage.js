import React, { useState } from "react";
import IngredientInput from "./IngredientInput";

export default function IngredientInputPage() {
  const [response, setResponse] = useState("");
  const apiKey = "sk-proj-J2UoqN2lfsS8UsLuCbkiT3BlbkFJijtWlXH5p3ViWUTcw8C6";

  async function processMessageToChatGPT(ingredients) {
    const promptMessage = {
      role: "system",
      content: `Given the ingredients ${ingredients.join(
        ", "
      )}, suggest possible meals.`,
    };
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [promptMessage],
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + apiKey, // Replace with your actual API key
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      const chatbotResponse = {
        role: "incoming",
        content: data.choices[0].message.content,
      };
      console.log(chatbotResponse.content); // Logging the chatbot response content
      setResponse(chatbotResponse.content); // Updating state to reflect the response
    } catch (error) {
      console.error("Error fetching response from OpenAI API:", error);
    }
  }

  const handleIngredientsSubmit = async (submittedIngredients) => {
    await processMessageToChatGPT(submittedIngredients);
  };

  return (
    <div>
      <IngredientInput onIngredientsSubmit={handleIngredientsSubmit} />
      {response && <RecipeList possibleMeals={response} />}
    </div>
  );
}
