import React, { useState, useRef } from "react";
import FileBase64 from "react-file-base64";
import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "../stylings/ImageUpload.css";
import Navbar from "./Navbar";
import RecipeList from "./RecipeList";

export default function UploadImage() {
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [detectedIngredients, setDetectedIngredients] = useState([]);
  const [detectedResults, setDetectedResults] = useState([]);
  const imageRefs = useRef([]);

  const handleFileUpload = (files) => {
    const newImages = files.map((file) => file.base64);
    setImages([...images, ...newImages]);
  };

  const detectObjectsOnImage = async (imageElement) => {
    const model = await cocoSsd.load();
    const predictions = await model.detect(imageElement);
    return predictions;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const ingredients = new Set();
    const results = [];

    try {
      for (let i = 0; i < imageRefs.current.length; i++) {
        const predictions = await detectObjectsOnImage(imageRefs.current[i]);
        results.push({ image: images[i], predictions });
        predictions.forEach(prediction => {
          if (prediction.score > 0.5) {
            ingredients.add(prediction.class);
          }
        });
      }

      setDetectedIngredients([...ingredients]);
      setDetectedResults(results);
      setImages([]); // Clear uploaded images after successful detection
    } catch (error) {
      console.error("Error detecting objects:", error);
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
                ref={(el) => (imageRefs.current[index] = el)}
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
        {detectedResults.length > 0 && (
          <div className="detected-results-container">
            {detectedResults.map((result, index) => (
              <div key={index} className="detected-result">
                <img
                  src={result.image}
                  alt={`Detected result ${index}`}
                  className="detected-image-content"
                />
                <div className="detected-predictions">
                  {result.predictions.map((prediction, idx) => (
                    <div key={idx} className="prediction">
                      {`${prediction.class} - ${(prediction.score * 100).toFixed(2)}%`}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {detectedIngredients.length > 0 && (
          <RecipeList ingredients={detectedIngredients} />
        )}
      </div>
    </div>
  );
}
