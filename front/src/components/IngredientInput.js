import React, { useState } from "react";
import "../stylings/IngredientInput.css";
import { TypeAnimation } from "react-type-animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function IngredientInput({ onIngredientsSubmit }) {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const CURSOR_CLASS_NAME = 'custom-type-animation-cursor';

  const handleInputChange = (e) => {
    setIngredient(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredient.trim() !== "") {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient("");
    }
  };

  const handleSubmit = () => {
    console.log("Submitting ingredients:", ingredients);
    onIngredientsSubmit(ingredients); // Pass ingredients array to parent component
  };

  return (
    <div className="container">
      <div className="input-group">
        <input
          type="text"
          value={ingredient}
          onChange={handleInputChange}
          placeholder="Enter an ingredient"
          className="ingredient-input"
        />
        <button onClick={handleAddIngredient} className="add-button">
          <FontAwesomeIcon icon={faPlus} /> 
        </button>
        <button onClick={handleSubmit} className="submit-button">
          <FontAwesomeIcon icon={faSearch} /> 
        </button>
      </div>
      {ingredients.length > 0 && (
        <ul className="ingredient-list">
          {ingredients.map((item, index) => (
            <li key={index}>
              <TypeAnimation
                sequence={[200, item, (el) => el.classList.remove(CURSOR_CLASS_NAME)]}
                speed={50}
                repeat={1} // Repeat once for each ingredient added
                cursor={false}
                className={CURSOR_CLASS_NAME}
                style={{ fontSize: "1em" }} // Adjust style as needed
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
