import React, { useEffect, useState } from "react";

export default function RecipeList({ possibleMeals }) {
  const [recipes, setRecipes] = useState([]);
  const APP_ID = "a451d215";
  const APP_KEY = "2a65a8887cf7ada79affc410c336e43b";

  useEffect(() => {
    // Example function to fetch recipes from Edamam API based on possibleMeals
    async function fetchRecipes() {
      try {
        // Use the possibleMeals data to query the Edamam API for recipes
        // Replace with your actual API call to Edamam
        const response = await fetch(
          `https://api.edamam.com/search?q=${possibleMeals}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data.hits); // Assuming data.hits contains the list of recipes
      } catch (error) {
        console.error("Error fetching recipes from Edamam API:", error);
      }
    }

    // Call fetchRecipes when possibleMeals changes
    if (possibleMeals) {
      fetchRecipes();
    }
  }, [possibleMeals]); // useEffect dependency on possibleMeals

  return (
    <div>
      <h2>Recipes based on possible meals:</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <h3>{recipe.recipe.label}</h3>
            <p>
              {recipe.recipe.ingredients
                .map((ingredient) => ingredient.text)
                .join(", ")}
            </p>
            <a
              href={recipe.recipe.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link to Recipe
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
