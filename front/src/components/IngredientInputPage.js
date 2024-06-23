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
