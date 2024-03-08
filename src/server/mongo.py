from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

client = MongoClient('mongodb://localhost:27017/')
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

if __name__ == '__main__':
    app.run(debug=True)