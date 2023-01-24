import React, { Component } from "react";
import "../css/RecipeFull.css";
import RecipeListItem from "./RecipeListItem";

class RecipeListHolder extends Component {

    constructor(){
        super();
        this.state = {
            recipes: []
        }
        this._getRecipes = this._getRecipes.bind(this);
    }

    componentDidMount(){
        const saved = this.props.saved;
        //temp
        const user_id = "63c89100b1cd9206c4989fb8";
        if (saved){
            this._getRecipes(`http://127.0.0.1:5000/favorites/${user_id}`);
        } else {
            this._getRecipes('http://127.0.0.1:5000/recipes');
        }
    }

    _getRecipes(url){
        fetch(url, {
            method: 'GET'
        })  
        .then((response) => response.json())
        .then((data) => {
            // console.log('Successs:', data);
            this.setState({
                recipes: data
            })
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    render(){
        const recipe_list = this.state.recipes.map(recipe => {
            return (
                <RecipeListItem id={recipe._id.$oid} title={recipe.title} ingredients={recipe.ingredients} instructions={recipe.instructions}/>
            )
        })

        return(
            <div className="RecipeListHolder">
                {recipe_list}
            </div>
        )
    }
} export default RecipeListHolder;