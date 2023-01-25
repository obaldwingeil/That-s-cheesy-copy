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
client = MongoClient(
    "mongodb+srv://Armando:Cheesy123@cheesy.1pp17n9.mongodb.net/?retryWrites=true&w=majority")
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

### User Class ###


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
    return dumps(recipes_list), 200


@app.route('/recipe', methods=['POST'])
def add_recipe():
    recipe = request.json
    recipes_collection.insert_one(recipe)
    return dumps({'message': 'Recipe added successfully'}), 201


@app.route('/recipe/<id>', methods=['GET'])
def get_recipe(id):
    recipe = recipes_collection.find_one({'_id': ObjectId(id)})
    recipe_obj = dict(recipe)
    return dumps(recipe_obj), 200


@app.route('/recipe/<id>', methods=['PUT'])
def update_recipe(id):
    recipe = request.json
    recipes_collection.update_one({'_id': ObjectId(id)}, {'$set': recipe})
    return dumps({'message': 'Recipe updated successfully'}), 200


@app.route('/recipe/<id>', methods=['DELETE'])
def delete_recipe(id):
    recipes_collection.delete_one({'_id': ObjectId(id)})
    return dumps({'message': 'Recipe deleted successfully'}), 200

### Favorite Recipes Endpoints ###


@app.route('/favorite-recipe', methods=['POST'])
def add_favorite_recipe():
    recipe = request.json
    favorite_recipes_collection = db.favorite_recipes
    favorite_recipes_collection.insert_one(recipe)
    return dumps({'message': 'Recipe added to favorites successfully'}), 201


@app.route('/favorite-recipe/<id>', methods=['DELETE'])
def delete_favorite_recipe(id):
    favorite_recipes_collection = db.favorite_recipes
    favorite_recipes_collection.delete_one({'_id': ObjectId(id)})
    return dumps({'message': 'Recipe removed from favorites successfully'}), 200

### User ###

@app.route('/login', methods=['POST'])
def get_users(): 
    login = request.json
    users = user_collection.find_one({ '$and': [{'username': login['username']}, {'password': login['password']}] })
    return dumps(users) # returns null if username and password do not match any records



@app.route('/favorites/<user_id>', methods=['GET'])
def get_favorites(user_id):
    user = user_collection.find_one({'_id': ObjectId(user_id)})
    favorites = user['saved']
    res = []
    for recipe in favorites:
        if recipe is not "":
            res.append(loads(get_recipe(recipe)[0]))
    return dumps(res)


@app.route('/notes/<user_id>/<recipe_id>', methods=['GET'])
def get_notes(user_id, recipe_id):
    user = user_collection.find_one({'_id': ObjectId(user_id)})
    notes = user['notes']
    res = "No Notes Yet!"
    for note in notes:
        if recipe_id in note:
            res = note[recipe_id]
    return dumps(res)

if __name__ == "__main__":
    app.run(debug=True)
