import logging
import os
from flask import Flask, request, jsonify
import base64
import cv2
import numpy as np
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from sklearn.preprocessing import LabelBinarizer
import gdown
import pickle

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
# Configure CORS to allow both local and production domains
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "https://recepie-maker-ai.vercel.app"]}})

# Paths for model and label binarizer
MODEL_PATH = 'vgg16_final.keras'
LB_PATH = 'label_binarizer.pkl'

# Download the model from Google Drive
FILE_ID = "1VhbC84GG5z5p-600r5CupVmjNo5m7rkp"
def download_model():
    url = f'https://drive.google.com/uc?id={FILE_ID}'
    gdown.download(url, MODEL_PATH, quiet=False)

# Load trained VGG16 model
def load_trained_model():
    if not os.path.exists(MODEL_PATH):
        download_model()
    return load_model(MODEL_PATH)

# Load and save the label binarizer
def save_label_binarizer(lb):
    with open(LB_PATH, 'wb') as f:
        pickle.dump(lb, f)
    logger.info("LabelBinarizer saved to %s", LB_PATH)

def load_label_binarizer():
    if os.path.exists(LB_PATH):
        with open(LB_PATH, 'rb') as f:
            logger.info("LabelBinarizer loaded from %s", LB_PATH)
            return pickle.load(f)
    else:
        logger.warning("LabelBinarizer not found, creating a new one.")
        labels = ['Bean', 'Bitter_Gourd', 'Bottle_Gourd', 'Brinjal', 'Broccoli',
                  'Cabbage', 'Capsicum', 'Carrot', 'Cauliflower', 'Cucumber',
                  'Papaya', 'Potato', 'Pumpkin', 'Radish', 'Tomato']
        lb = LabelBinarizer()
        lb.fit(labels)
        save_label_binarizer(lb)
        return lb

# Perform object detection using the VGG16 model
def perform_object_detection(image_path, model, lb):
    img = load_img(image_path, target_size=(224, 224))
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    predicted_class = lb.classes_[predicted_class_index]
    confidence_score = round(float(np.max(predictions)) * 100, 2)

    return predicted_class, confidence_score

@app.route('/upload', methods=['POST'])
def handle_upload():
    try:
        logger.info("Received request to upload")

        data = request.get_json()

        images = data.get('images', [])
        logger.info("Number of images received: %d", len(images))

        model = load_trained_model()
        lb = load_label_binarizer()
        if lb is None:
            logger.error("LabelBinarizer not found")
            return jsonify({"error": "LabelBinarizer not found"}), 500

        detected_ingredients = []
        for index, image_data in enumerate(images):
            logger.info("Processing image %d", index + 1)

            # Decode the base64 image
            try:
                image_data = image_data.split(",")[1] 
                image_bytes = base64.b64decode(image_data)
                nparr = np.frombuffer(image_bytes, np.uint8)
                image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                logger.info("Successfully decoded image %d", index + 1)
            except Exception as e:
                logger.error("Error decoding image %d: %s", index + 1, str(e))
                return jsonify({"error": "Failed to decode image"}), 400

            # Save image to disk for processing
            image_path = f'uploads/image_{index + 1}.jpg'
            cv2.imwrite(image_path, image)
            logger.info("Saved image %d to %s", index + 1, image_path)

            # Perform object detection
            try:
                label, confidence = perform_object_detection(image_path, model, lb)
                detected_ingredients.append({"index": index, "label": label, "confidence": confidence})
                logger.info("Detected label for image %d: %s with confidence %.2f", index + 1, label, confidence)
            except Exception as e:
                logger.error("Error performing object detection on image %d: %s", index + 1, str(e))
                return jsonify({"error": "Object detection failed"}), 500

        logger.info("Detected ingredients before sorting: %s", detected_ingredients)

        # Sort by index to ensure order matches the uploaded images
        detected_ingredients_sorted = sorted(detected_ingredients, key=lambda x: x['index'])
        detected_ingredients_result = [
            {"label": item["label"], "confidence": item["confidence"]}
            for item in detected_ingredients_sorted
        ]

        logger.info("Detected ingredients after sorting: %s", detected_ingredients_result)

        return jsonify({"ingredients": detected_ingredients_result})
    except Exception as e:
        logger.error("Error handling upload: %s", str(e))
        return jsonify({"error": "Internal server error"}), 500



if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(port=5000)
