from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

#pip install flask
#pip install pymongo
#pip install flask_cors

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
uri = "mongodb+srv://pokefun:rliiTFpEjM0zeTIf@pokefun.hglcxgo.mongodb.net/?retryWrites=true&w=majority&appName=PokeFun"
client = MongoClient(uri,server_api=ServerApi('1')) # Connect to the MongoDB cluster
db = client['Pokemon']
collection = db['Pokemon']

@app.route('/insert_one', methods=['POST'])
def insert_one():
    data = request.get_json()
    name = data.get('name')
    spriteurl = data.get('spriteurl')
    try:
        # Insert the document into the collection
        result = collection.insert_one({'name': name, 'spriteurl': spriteurl})

        # Return the result
        return jsonify({'result': 'success', 'details': str(result.inserted_id)})

    except Exception as e:
        # Handle errors gracefully
        return jsonify({'result': 'error', 'details': str(e)})

@app.route('/get_pokemon_starting_with/<input>', methods=['GET'])
def get_pokemon_starting_with(input):
    try:
        # Query the collection for Pokemon starting with the given input
        # Exclude the _id field
        results = collection.find({'name': {'$regex': f'^{input}', '$options': 'i'}}, {'_id': 0})

        # Convert the results to a list of dictionaries
        pokemon_list = [pokemon for pokemon in results]

        # Return the results
        return jsonify(pokemon_list)

    except Exception as e:
        # Handle errors gracefully
        return jsonify({'result': 'error', 'details': str(e)})


if __name__ == '__main__':
    app.run(debug=True)