# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from detect_ingredients import detect_ingredients

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/upload', methods=['POST'])
def handle_upload():
    try:
        # Call the function from detect_ingredients.py
        ingredients = detect_ingredients()
        
        # Example: You can perform further processing or return the ingredients directly
        return jsonify({"ingredients": ingredients}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
