import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import "../stylings/ImageUpload.css";
import Navbar from "./Navbar";
import RecipeList from "./RecipeList"; // Import RecipeList component

const API_URL = "http://127.0.0.1:5000/api/upload";

export default function UploadImage() {
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [detectedIngredients, setDetectedIngredients] = useState([]);

  const handleFileUpload = (files) => {
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

      if (!response.ok) {
        throw new Error(`Failed to submit images: ${response.status}`);
      }

      const data = await response.json();
      setDetectedIngredients(data.ingredients); // Set detected ingredients from API response
      setImages([]); // Clear uploaded images after successful upload
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="upload-image-container">
        <h2 className="upload-image-title">Upload Images of Ingredients</h2>
        <div className="file-upload-container">
          <FileBase64 multiple={true} onDone={handleFileUpload} />
        </div>
        <div className="uploaded-images-container">
          {images.map((image, index) => (
            <div key={index} className="uploaded-image">
              <img
                src={image}
                alt={`Uploaded ingredient ${index}`}
                className="uploaded-image-content"
              />
            </div>
          ))}
        </div>
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={images.length === 0 || submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
        {detectedIngredients.length > 0 && (
          <RecipeList ingredients={detectedIngredients} />
        )}
      </div>
    </div>
  );
}
