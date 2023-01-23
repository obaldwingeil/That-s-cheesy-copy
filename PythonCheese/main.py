from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

# These dependecies allow us to create the basic structure of our Flask application and connect to MongoDB
app = Flask(__name__)  # Create the Flask application
# Connect to MongoDB
app.config["MONGO_URI"] = "mongodb://localhost:27017/cheesydb"
mongo = PyMongo(app)  # Create a PyMongo object

### Recipe class that uses ObjectId as its primary key: ###


class Recipe:
    def __init__(self, title, ingredients, instructions, personal_notes=None, image=None, _id=None):
        self.title = title
        self.ingredients = ingredients
        self.instructions = instructions
        self.personal_notes = personal_notes
        self.image = image
        self._id = ObjectId() if _id is None else _id

# Set up to create API endpoints for our Flask application
### Recipes ###


@app.route("/recipes", methods=["GET"])
@app.route('/recipe', methods=['POST'])
def add_recipe():
    recipe = request.json
    mongo.db.recipes.insert_one(recipe)
    return jsonify({'message': 'Recipe created successfully'}), 201

# Endpoints for getting all recipes, updating a recipe, and deleting a recipe


@app.route('/recipe/<id>', methods=['GET'])
def get_recipe(id):
    recipe = mongo.db.recipes.find_one({'_id': ObjectId(id)})
    return jsonify(recipe), 200


@app.route('/recipe/<id>', methods=['PUT'])
def update_recipe(id):
    recipe = request.json
    mongo.db.recipes.update_one({'_id': ObjectId(id)}, {'$set': recipe})
    return jsonify({'message': 'Recipe updated successfully'}), 200


@app.route('/recipe/<id>', methods=['DELETE'])
def delete_recipe(id):
    mongo.db.recipes.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Recipe deleted successfully'}), 200

# Endpoint for getting all of the recipes


@app.route('/recipes', methods=['GET'])
def get_all_recipes():
    recipes = mongo.db.recipes.find()
    output = []
    for recipe in recipes:
        output.append({'title': recipe['title'], 'ingredients': recipe['ingredients'],
                       'instructions': recipe['instructions'], 'personal_notes': recipe['personal_notes'],
                       'image': recipe['image'], '_id': str(recipe['_id'])})
    return jsonify(output), 200


if __name__ == '__main__':
    app.run(debug=True)
