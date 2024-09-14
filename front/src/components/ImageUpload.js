import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import "../stylings/ImageUpload.css";
import Navbar from "./Navbar";
import RecipeList from "./RecipeList";

const API_URL = "http://127.0.0.1:5000/upload";

export default function UploadImage() {
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [detectedIngredients, setDetectedIngredients] = useState([]);

  const handleFileUpload = (files) => {
    // Map the uploaded files to base64 strings and update state
    const newImages = files.map((file) => file.base64);
    setImages([...images, ...newImages]);
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images }),
      });
      console.log("Detected ingredients:", detectedIngredients);

      if (!response.ok) {
        throw new Error(`Failed to submit images: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from server:", data);
      setDetectedIngredients(data.ingredients);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Extract labels from detected ingredients
  const ingredientLabels = detectedIngredients.map(
    (ingredient) => ingredient[0]
  );

  console.log("Ingredient labels passed to RecipeList:", ingredientLabels);

  return (
    <div>
      <Navbar />
      <div className="upload-image-container">
        <h2 className="upload-image-title">Upload Images of Ingredients</h2>
        <div className="file-upload-container">
          <FileBase64 multiple={true} onDone={handleFileUpload} />
        </div>
        <div className="uploaded-images-container">
          {images.map((image, index) => {
            // Find detected ingredient for this image
            const ingredient = detectedIngredients[index];

            return (
              <div key={index} className="uploaded-image">
                <div className="image-wrapper">
                  <img
                    src={image}
                    alt={`Uploaded ingredient ${index}`}
                    className="uploaded-image-content"
                  />
                  {ingredient && (
                    <div className="overlay">
                      <span className="ingredient-label">{ingredient[0]}</span>
                      <span className="ingredient-confidence">
                        {ingredient[1]}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={images.length === 0 || submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
        {ingredientLabels.length > 0 && (
          <RecipeList ingredientLabels={ingredientLabels} />
        )}
      </div>
    </div>
  );
}
