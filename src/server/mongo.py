from flask import Flask, jsonify, request, make_response
from pymongo import MongoClient
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import jwt
from datetime import datetime, timedelta

app = Flask(__name__)
uri = "mongodb+srv://pokefun:rliiTFpEjM0zeTIf@pokefun.hglcxgo.mongodb.net/?retryWrites=true&w=majority&appName=PokeFun"
client = MongoClient(uri,server_api=ServerApi('1')) # Connect to the MongoDB cluster
db = client['Pokemon']
collectionPokemon = db['Pokemon']
collectionUsers = db['Users']

    # token = request.headers.get('Authorization') //! This is how you get the jwt from the request


SECRET_KEY = "oU7ufaHTqk7lE0OM7as5Kl1AY43G7UfO"
def generate_jwt(username):
    payload = {
        'exp': datetime.utcnow() + timedelta(days=0, minutes=30),
        'iat': datetime.utcnow(),
        'sub': username
    }
    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm='HS256'
    )

def extract_username(token):
    print('Token:', token)
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        print('Payload:', payload)
        print(SECRET_KEY)
        return payload['sub']
    except jwt.ExpiredSignatureError:
        print('Token is expired')
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        print('Token is invalid')
        return 'Invalid token. Please log in again.'


@app.route('/registerUser', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'result': 'error', 'details': 'Username or password not provided'})

    existing_user = collectionUsers.find_one({'username': username})

    if existing_user is not None:
        return jsonify({'result': 'error', 'details': 'Username already registered'})

    try:
        result = collectionUsers.insert_one({'username': username, 'password': password})

        # Generate a JWT token for the new user
        token = generate_jwt(username)

        # Create a response
        response = make_response(jsonify({'result': 'success', 'details': str(result.inserted_id)}))

        # Set the JWT token as an HttpOnly cookie
        response.set_cookie('token', token, httponly=True)

        return response
    except Exception as e:
        # Handle errors gracefully
        return jsonify({'result': 'error', 'details': str(e)})
    
@app.route('/loginUser', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'result': 'error', 'details': 'Username or password not provided'})

    existing_user = collectionUsers.find_one({'username': username, 'password': password})

    if existing_user is None:
        return jsonify({'result': 'error', 'details': 'Invalid username or password'})

    try:
        # Generate a JWT token for the user
        token = generate_jwt(username)

        # Create a response
        response = make_response(jsonify({'result': 'success', 'details': 'Logged in'}))

        # Set the JWT token as an HttpOnly cookie
        response.set_cookie('token', token, httponly=True)

        return response
    except Exception as e:
        # Handle errors gracefully
        return jsonify({'result': 'error', 'details': str(e)})
    

@app.route('/saveHighscoreForHigherLower', methods=['POST'])
def saveHigherLowerHighscoreToMongo():
    data = request.get_json()
    token = request.cookies.get('token')  # Get the token from the cookies
    username = extract_username(token)
    score = data.get('score')

    if username is None:
        return jsonify({'result': 'error', 'details': 'No user logged in'})

    try:
        # Create a filter to find the user
        user_filter = {'username': username}

        # Create the update operation
        new_values = {"$set": {'score': score}}

        # Update the user document
        result = collectionUsers.update_one(user_filter, new_values)

        return jsonify({'result': 'success', 'score': score})

    except:
        return jsonify({'result': 'error', 'details': 'Error saving highscore'})




if __name__ == '__main__':
    CORS(app, supports_credentials=True)  
    app.run(debug=True)
