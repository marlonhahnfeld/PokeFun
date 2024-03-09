from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

#pip install flask
#pip install pymongo
#pip install flaskcors

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
uri = "mongodb+srv://pokefun:rliiTFpEjM0zeTIf@pokefun.hglcxgo.mongodb.net/?retryWrites=true&w=majority&appName=PokeFun"
client = MongoClient(uri,server_api=ServerApi('1')) # Connect to the MongoDB cluster
db = client['Pokemon']
collectionPokemon = db['Pokemon']
collectionUsers = db['Users']

@app.route('/insert_one', methods=['POST'])
def insert_one():
    data = request.get_json()
    name = data.get('name')
    spriteurl = data.get('spriteurl')
    try:
        # Insert the document into the collectionPokemon
        result = collectionPokemon.insert_one({'name': name, 'spriteurl': spriteurl})

        # Return the result
        return jsonify({'result': 'success', 'details': str(result.inserted_id)})

    except Exception as e:
        # Handle errors gracefully
        return jsonify({'result': 'error', 'details': str(e)})
    

@app.route('/registerUser', methods=['POST'])
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
        # Insert the document into the collectionUsers
        result = collectionUsers.insert_one({'username': username, 'password': password})

        # Return the result
        return jsonify({'result': 'success', 'details': str(result.inserted_id)})

    except Exception as e:
        # Handle errors gracefully
        return jsonify({'result': 'error', 'details': str(e)})

if __name__ == '__main__':
    app.run()