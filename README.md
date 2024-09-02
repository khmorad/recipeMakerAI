# RecipeMakerAI

RecipeMakeAI is a web application that allows users to input ingredients in a search bar to generate recipes based on those ingredients. The application also utilizes Flask and CNN models for object detection to identify ingredients from images. The recipes themselves are fetched from the Edamam API.

## Demo

Live [Demo](https://youtu.be/erw31rS5tag) of this project

## Team Members
- Khashayar Moradpour
- Shizuka Takao
- Anupriya Islam

## Features
- **Ingredient Input**: Users can manually input ingredients in the search bar to generate recipes.
- **Object Detection**: Utilizes TensorFlow to detect ingredients from images uploaded by the user.
- **Recipe Generation**: Fetches recipes based on input ingredients from the Edamam API.
- **Time Estimate and Calories**: Uses OpenAI API to estimate the time required and the number of calories for each recipe.

## Technologies Used
- **Flask**: For the backend web server.
- **TensorFlow**: For object detection to identify ingredients from images.
- **Edamam API**: For fetching recipes based on ingredients.
- **React**: For the frontend interface.
- **HTML/CSS/JavaScript**: For additional frontend styling and functionality.

## Installation

### Backend

1. Clone the repository:
    ```bash
    git clone https://github.com/khmorad/recepieMakerAI.git
    cd  /recepieMakerAI/back
    ```

2. Create a virtual environment and activate it:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```

4. Set up environment variables for the API keys:
    ```bash
    export FLASK_APP=app.py
    export EDAMAM_API_KEY=your_edamam_api_key
    export EDAMAM_APP_ID=your_edamam_app_id
    export OPENAI_API_KEY=your_openai_api_key
    ```

5. Run the application:
    ```bash
    python app.py 
    ```

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd ../front
    ```

2. Install the required packages:
    ```bash
    npm install
    ```

3. Start the React development server:
    ```bash
    npm start
    ```

## Usage

1. Open your web browser and go to `http://localhost:3000/`.
2. Input ingredients in the search bar to generate recipes.
3. Optionally, upload an image of ingredients to use the object detection feature.
4. View the generated recipes along with time estimates and calorie information.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
