from flask import Flask, request, jsonify
import base64
import cv2
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dummy function for object detection, replace with your actual implementation
def perform_object_detection(image):
    # Placeholder: replace with your object detection logic
    detected_labels = ["apple", "banana", "carrot"]  # Example labels
    return detected_labels

@app.route('/api/upload', methods=['POST'])
def upload():
    print("Received request to /api/upload")
    
    data = request.get_json()
    images = data.get('images', [])

    detected_ingredients = []
    for index, image_data in enumerate(images):
        print(f"Processing image {index + 1}")
        
        # Decode the base64 image
        image_data = image_data.split(",")[1]  # Remove the data URL prefix
        image_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Perform object detection
        labels = perform_object_detection(image)
        detected_ingredients.extend(labels)
        
        print(f"Detected labels for image {index + 1}: {labels}")

    # Remove duplicates and return
    detected_ingredients = list(set(detected_ingredients))
    print("Detected ingredients:", detected_ingredients)
    
    return jsonify({"ingredients": detected_ingredients})

if __name__ == '__main__':
    app.run(debug=True)
