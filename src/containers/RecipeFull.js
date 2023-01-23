import React, { Component } from "react";
import "../css/RecipeFull.css";

class RecipeFull extends Component {

    constructor() {
        super();
        this.state = {
            // recipe_id: this.props.recipe_id
        }
        this._getRecipe = this._getRecipe.bind(this);
        
    }

    componentDidMount() {
        this._getRecipe();
    }

    _getRecipe() {
        // const id = this.state.recipe_id;
        // hard coding the id for now, needs to be updated 
        fetch('mongodb://localhost:27017/recipes/recipe/63c89100b1cd9206c4989fb8', {
            method: 'GET'
        })  
        .then((response) => response.json())
        .then((data) => {
            console.log('Successs:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    render(){
        return (
            <div className="recipe_full_container">
                <div className="title_container">

                </div>
                <div className="ingredient_container">

                </div>
                <div className="instruction_container">

                </div>
                <div className="note_container">

                </div>
            </div>
        )
    }

} export default RecipeFull;
