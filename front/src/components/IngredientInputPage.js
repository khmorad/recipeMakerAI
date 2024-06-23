import React, { useState } from "react";
import IngredientInput from "./IngredientInput";
import RecipeList from "./RecipeList"; // Import RecipeList component
export default function IngredientInputPage() {
  
  const [ingredients, setIngredients] = useState([]);

  const handleIngredientsSubmit = (submittedIngredients) => {
    console.log("Submitted ingredients:", submittedIngredients);
    setIngredients(submittedIngredients);
    console.log(ingredients);
  };

  return (
    <div>
      <IngredientInput onIngredientsSubmit={handleIngredientsSubmit} />
      {ingredients.length > 0 && <RecipeList ingredients={ingredients} />}
    </div>
  );
}

// import React, { useState } from "react";
// import IngredientInput from "./IngredientInput";
// // import RecipeList from "./RecipeList";

// export default function IngredientInputPage() {
//   const [response, setResponse] = useState("");
//   const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

//   // Log the API key to ensure it is correctly fetched from .env
//   console.log("API Key:", apiKey);

//   async function processMessageToChatGPT(ingredients) {
//     const promptMessage = {
//       role: "system",
//       content: `Given the ingredients ${ingredients.join(
//         ", "
//       )}, suggest possible meals. Please provide only the names of the meals in a numbered list format.`,
//     };
//     const apiRequestBody = {
//       model: "gpt-3.5-turbo",
//       messages: [promptMessage],
//     };

//     try {
//       const response = await fetch(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             Authorization:
//               "Bearer " +
//               apiKey,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(apiRequestBody),
//         }
//       );
//       if (!response.ok) {
//         throw new Error(`API request failed with status ${response.status}`);
//       }
//       const data = await response.json();
//       const chatbotResponse = {
//         role: "incoming",
//         content: data.choices[0].message.content,
//       };
//       console.log("Chatbot response:", chatbotResponse.content);
//       setResponse(chatbotResponse.content);
//     } catch (error) {
//       console.error("Error fetching response from OpenAI API:", error);
//     }
//   }

//   const handleIngredientsSubmit = async (submittedIngredients) => {
//     console.log("Submitted ingredients:", submittedIngredients);
//     await processMessageToChatGPT(submittedIngredients);
//   };

//   return (
//     <div>
//       <IngredientInput onIngredientsSubmit={handleIngredientsSubmit} />
//       {response && <div>Response: {response}</div>}
//       {/* {response && <RecipeList possibleMeals={response} />} */}
//     </div>
//   );
// }
