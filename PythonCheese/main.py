from flask import Flask, jsonify, request 
from flask_pymongo import PyMongo
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import dumps, loads

# These dependecies alpip3 low us to create the basic structure of our Flask application and connect to MongoDB
app = Flask(__name__)  # Create the Flask application
CORS(app)
# Connect to MongoDB
# app.config["MONGO_URI"] = "mongodb://localhost:27017/cheesydb"
client = MongoClient("mongodb+srv://Olivia:Cheesy123@cheesy.1pp17n9.mongodb.net/?retryWrites=true&w=majority")
db = client.cheesydb
recipes_collection = db.recipes
user_collection = db.login

### Recipe class that uses ObjectId as its primary key: ###

class Recipe:
    def __init__(self, title, ingredients, instructions, personal_notes=None, image=None, _id=None):
        self.title = title
        self.ingredients = ingredients
        self.instructions = instructions
        self.personal_notes = personal_notes
        self.image = image
        self._id = ObjectId() if _id is None else _id

### User class ###

class User:
    def __init__(self, username, password, _id=None):
        self.username = username
        self.password = password
        self._id = ObjectId() if _id is None else _id

# Set up to create API endpoints for our Flask application
### Recipes ###

@app.route('/recipes', methods=['GET'])
def get_recipes():
    recipes = recipes_collection.find()
    recipes_list = list(recipes)
    return dumps(recipes_list)


@app.route('/addrecipe', methods=['POST'])
def add_recipe():
    recipe = request.json
    recipes_collection.insert_one(recipe)
    return dumps({'message': 'Recipe added successfully'}), 201


@app.route('/recipe/<id>', methods=['GET'])
def get_recipe(id):
    recipe = recipes_collection.find_one({'_id': ObjectId(id)})
    recipe_list = dict(recipe)
    print(recipe_list)
    return dumps(recipe_list)


@app.route('/recipe/<id>', methods=['PUT'])
def update_recipe(id):
    recipe = request.json
    recipes_collection.update_one({'_id': ObjectId(id)}, {'$set': recipe})
    return dumps({'message': 'Recipe updated successfully'}), 200


@app.route('/recipe/<id>', methods=['DELETE'])
def delete_recipe(id):
    recipes_collection.delete_one({'_id': ObjectId(id)})
    return dumps({'message': 'Recipe deleted successfully'}), 200

### User ###

@app.route('/login', methods=['GET'])
def get_users():
    users = user_collection.find()
    users_list = list(users)
    return dumps(users_list)

@app.route('/favorites/<user_id>', methods=['GET'])
def get_favorites(user_id):
    user = user_collection.find_one({'_id': ObjectId(user_id)})
    favorites = user['saved']
    res = []
    for recipe in favorites:
        res.append(loads(get_recipe(recipe)))
    return dumps(res)

### Run backend ###

if __name__ == "__main__":
    app.run(debug=True)