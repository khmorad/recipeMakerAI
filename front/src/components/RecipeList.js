import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import "../stylings/RecipeList.css"; // Import the CSS file for styling

const APP_ID = process.env.REACT_APP_EDAMAM_API_ID;
const APP_KEY = process.env.REACT_APP_EDAMAM_API_KEY;
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export default function RecipeList({ ingredients }) {
  const [recipes, setRecipes] = useState([]);
  const [openAiResponses, setOpenAiResponses] = useState({});

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const query = ingredients.join(",");
        const encodedQuery = encodeURIComponent(query.trim());
        console.log(`Fetching recipes for: ${encodedQuery}`);

        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${encodedQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        console.log(`Response for ${encodedQuery}:`, response);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        if (data.hits.length > 0) {
          const fetchedRecipes = data.hits.map((hit) => ({
            label: hit.recipe.label,
            description: hit.recipe.source,
            image: hit.recipe.image,
            url: hit.recipe.url,
            calories: hit.recipe.calories,
            ingredientsList: hit.recipe.ingredients,
          }));
          setRecipes(fetchedRecipes);
          await fetchAllEstimatedTimes(fetchedRecipes);
        } else {
          console.log(`No recipes found for ${encodedQuery}`);
          setRecipes([]); // Clear the recipes if none are found
        }
      } catch (error) {
        console.error("Error fetching recipes from Edamam API:", error);
      }
    }

    async function fetchAllEstimatedTimes(recipes) {
      const responses = {};
      for (const recipe of recipes) {
        const estimatedTime = await fetchOpenAiEstimatedTime(recipe);
        responses[recipe.label] = estimatedTime;
      }
      setOpenAiResponses(responses);
    }

    if (ingredients.length > 0) {
      fetchRecipes();
    }
  }, [ingredients]);

  async function fetchOpenAiEstimatedTime(recipe) {
    const promptMessage = {
      role: "system",
      content: `Estimate the preparation time in minutes for the following meal. Here are the details: \n\nName: ${
        recipe.label
      }\nSource: ${recipe.description}\nCalories: ${Math.round(
        recipe.calories
      )}\nIngredients: ${recipe.ingredientsList
        .map((ingredient) => ingredient.text)
        .join(", ")}`,
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
            Authorization: "Bearer " + OPENAI_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      const chatbotResponse = data.choices[0].message.content;

      // Extracting the estimated preparation time
      const estimatedTimeMatch = chatbotResponse.match(/(\d+)\s*minutes/);
      const estimatedTime = estimatedTimeMatch
        ? Math.ceil(parseInt(estimatedTimeMatch[1]) / 5) * 5
        : "Unavailable";
      return isNaN(estimatedTime) ? "Unavailable" : estimatedTime;
    } catch (error) {
      console.error("Error fetching response from OpenAI API:", error);
      return "Unavailable";
    }
  }

  return (
    <div className="recipeContainer">
      <h2>Recipes based on ingredients:</h2>
      <div className="recipe-grid">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <a href={recipe.url} target="_blank" rel="noopener noreferrer">
              <h3>{recipe.label}</h3>
              <img src={recipe.image} alt={recipe.label} />
              <p>by {recipe.description}</p>
              <p>
                Calories: {Math.round(recipe.calories)} |
                {openAiResponses[recipe.label] !== undefined && (
                  <span>
                    <FontAwesomeIcon icon={faClock} />{" "}
                    {openAiResponses[recipe.label] + " min"}
                  </span>
                )}
              </p>
              <div className="ingredients-list">
                <p>Ingredients:</p>
                <ul>
                  {recipe.ingredientsList.map((ingredient, idx) => (
                    <li key={idx}>
                      <div className="ingredient">
                        {ingredient.text}
                        {ingredient.weight && (
                          <span className="ingredient-weight">
                            {" "}
                            ({Math.round(ingredient.weight)}g)
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}