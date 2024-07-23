
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '021888274047Mm!'
app.config['MYSQL_DB'] = 'recipemaker'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor' # Makes database into dictionary format - userful because it is in JSON format

mysql = MySQL(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# We are making API here! Yay!
# /users can be anything and be different among each method
@app.route('/users', methods=['GET'])
def get_users():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Users")
        users = cur.fetchall() 
        cur.close()
        return jsonify(users), 200 # 200 means good status 
    except Exception as e:
        return jsonify({"error": str(e)}), 400 # 400 means API didn't work correctly

@app.route('/users', methods=['POST'])
def create_user():
    try:
        cur = mysql.connection.cursor()
        user_data = request.json
        email = user_data["Email"]
        password = user_data["Password"]
        userID = user_data["UserID"]
        username = user_data["Username"]
        
        cur.execute("INSERT INTO Users VALUES (%s, %s, %s, %s)",
                    (userID, username, password, email)
        )
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_customer(user_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM Users WHERE UserID = %s", (user_id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/users/<int:user_id>', methods=['PUT'])   
def update_user(user_id):
    try:
        cur = mysql.connection.cursor()
        
        # Extract user data from the request JSON
        user_data = request.json
        userID = user_id
        username = user_data["Username"]
        password = user_data["Password"]
        email = user_data["Email"]
        
        # Update user information in the database
        cur.execute(" UPDATE Users SET Username = %s, Password = %s, Email = %s WHERE UserID = %s", (username, password, email, userID))
        mysql.connection.commit()
        cur.close()
        
        return jsonify({"message": "User updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
