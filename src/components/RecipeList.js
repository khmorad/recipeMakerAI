import React, { useEffect, useState } from "react";

const APP_ID = process.env.REACT_APP_EDAMAM_APP_ID;
const APP_KEY = process.env.REACT_APP_EDAMAM_API_KEY;

export default function RecipeList({ ingredients }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        console.log(APP_KEY)
        // Join ingredients into a single string for querying
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
          }));
          setRecipes(fetchedRecipes);
        } else {
          console.log(`No recipes found for ${encodedQuery}`);
          setRecipes([]); // Clear the recipes if none are found
        }
      } catch (error) {
        console.error("Error fetching recipes from Edamam API:", error);
      }
    }

    if (ingredients.length > 0) {
      fetchRecipes();
    }
  }, [ingredients]);

  return (
    <div>
      {APP_KEY}
      <h2>Recipes based on ingredients:</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <h3>{recipe.label}</h3>
            <p>{recipe.description}</p>
            <img src={recipe.image} alt={recipe.label} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// export default function RecipeList({ possibleMeals }) {
//   const [recipes, setRecipes] = useState([]);

//   useEffect(() => {
//     async function fetchRecipes() {
//       try {
//         // Split possibleMeals string into an array of meals
//         const mealsArray = possibleMeals
//           .split(/\d+\.\s/)
//           .filter((item) => item.trim() !== "");

//         if (mealsArray.length === 0) {
//           return;
//         }

//         // Fetch recipes for each meal using Edamam API
//         const requests = mealsArray.map(async (meal) => {
//           const encodedMeal = encodeURIComponent(meal.trim());
//           console.log(`Fetching recipe for: ${encodedMeal}`);
//           const response = await fetch(
//             `https://api.edamam.com/api/recipes/v2?type=public&q=${encodedMeal}&app_id=${APP_ID}&app_key=${APP_KEY}`
//           );
//           console.log(`Response for ${encodedMeal}:`, response);
//           if (!response.ok) {
//             throw new Error(
//               `API request failed with status ${response.status}`
//             );
//           }
//           const data = await response.json();
//           if (data.hits.length > 0) {
//             return {
//               label: data.hits[0].recipe.label,
//               description: data.hits[0].recipe.source,
//               image: data.hits[0].recipe.image,
//             };
//           } else {
//             console.log(`No recipes found for ${encodedMeal}`);
//             return null; // Handle case where no recipes are found for the meal
//           }
//         });

//         // Wait for all requests to complete
//         const recipesData = await Promise.all(requests);

//         // Update state with recipes data
//         setRecipes(recipesData.filter((recipe) => recipe !== null));
//       } catch (error) {
//         console.error("Error fetching recipes from Edamam API:", error);
//       }
//     }

//     if (possibleMeals) {
//       fetchRecipes();
//     }
//   }, [possibleMeals]);

//   return (
//     <div>
//       <h2>Recipes based on possible meals:</h2>
//       <ul>
//         {recipes.map((recipe, index) => (
//           <li key={index}>
//             <h3>{recipe.label}</h3>
//             <p>{recipe.description}</p>
//             <img src={recipe.image} alt={recipe.label} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
