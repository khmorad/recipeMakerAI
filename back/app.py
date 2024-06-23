import logging
import os
from flask import Flask, request, jsonify
import base64
import cv2
import numpy as np
from flask_cors import CORS
from ultralytics import YOLO  # Ensure ultralytics is installed

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)
model = YOLO("yolov8n.pt")  # Load the YOLOv8 model

# Log model names to check if they exist
logger.info("Model names: %s", model.names)  # This will log the class names mapping

# Function to perform object detection using YOLOv8 model
def perform_object_detection(image_path):
    results = model(image_path)
    labels = [model.names[int(result)] for result in results[0].boxes.cls]  # Extract labels using 'cls' and 'model.names'
    return labels

@app.route('/api/upload', methods=['POST'])
def handle_upload():
    logger.info("Received request to /api/upload")

    data = request.get_json()
    images = data.get('images', [])

    detected_ingredients = []
    for index, image_data in enumerate(images):
        logger.info("Processing image %d", index + 1)

        # Decode the base64 image
        image_data = image_data.split(",")[1]  # Remove the data URL prefix
        image_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Save image to disk for YOLO processing
        image_path = f'uploads/image_{index + 1}.jpg'
        cv2.imwrite(image_path, image)

        # Perform object detection
        labels = perform_object_detection(image_path)
        detected_ingredients.extend(labels)

        logger.info("Detected labels for image %d: %s", index + 1, labels)

    # Remove duplicates and return
    detected_ingredients = list(set(detected_ingredients))
    logger.info("Detected ingredients: %s", detected_ingredients)

    return jsonify({"ingredients": detected_ingredients})

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(port=5000)
