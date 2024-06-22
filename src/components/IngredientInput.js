import React, { useState } from "react";

export default function IngredientInput({ onIngredientsSubmit }) {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const handleInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredient) {
      setIngredients([...ingredients, ingredient]);
      setIngredient("");
    }
  };

  const handleSubmit = () => {
    onIngredientsSubmit(ingredients);
  };

  return (
    <div>
      <input
        type="text"
        value={ingredient}
        onChange={handleInputChange}
        placeholder="Enter an ingredient"
      />
      <button onClick={handleAddIngredient}>Add Ingredient</button>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit Ingredients</button>
    </div>
  );
}
