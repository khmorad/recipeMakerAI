import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import "../stylings/ImageUpload.css"; // Import your CSS file
import Navbar from "./Navbar";

const API_URL = "http://localhost:5000/api/upload"; // Adjust URL as per your Flask backend

export default function UploadImage({ setIngredients }) {
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false); // State to manage submitting status

  const handleFileUpload = (files) => {
    const newImages = files.map((file) => file.base64);
    setImages([...images, ...newImages]);
  };

  const handleSubmit = async () => {
    setSubmitting(true); // Set submitting to true when starting upload

    try {
      // Assuming images is an array of base64 encoded strings
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images }), // Send images to backend
      });

      if (!response.ok) {
        throw new Error(`Failed to submit images: ${response.status}`);
      }

      const data = await response.json();
      setIngredients(data.ingredients); // Update parent component with detected ingredients
      // Clear images after successful upload
      setImages([]);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setSubmitting(false); // Reset submitting status
    }
  };

  return (
    <div className="upload-image-container">
      <Navbar />
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
    </div>
  );
}
