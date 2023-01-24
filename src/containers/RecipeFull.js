import React, { Component } from "react";
import "../css/RecipeFull.css";
import { useSearchParams } from "react-router-dom";

class RecipeFull extends Component {

    constructor() {
        super();
        this.state = {
            recipe_id: "",
            title: "",
            ingredients: [],
            instructions: []
        }
        this._getRecipe = this._getRecipe.bind(this);
        
    }

    componentDidMount() {
        this._getRecipe();
        const [searchParams] = useSearchParams();
        const id = searchParams.id;
        console.log(id);
        this.setState({
            recipe_id: id
        })
    }

    _getRecipe() {
        const id = this.state.recipe_id;
        fetch(`http://127.0.0.1:5000/recipe/${id}`, {
            method: 'GET'
        })  
        .then((response) => response.json())
        .then((data) => {
            console.log('Successs:', data);
            const ingredients = data.ingredients;
            const instructions = data.instructions;
            const title = data.title;
            this.setState({
                ingredients: ingredients,
                instructions: instructions,
                title: title
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    render(){
        const ingredient_map = this.state.ingredients.map(i => {
            return(<li className="ingredient">{i}</li>)
        })

        const instruction_map = this.state.instructions.map(i => {
            return(<li className="instruction">{i}</li>)
        })

        return (
            <div className="recipe_full_container">
                <div className="title_container">
                    <h1 className="title">{this.state.title}</h1>
                </div>
                <div className="ingredient_container">
                    <h3 className="ingredient_title">Ingredients</h3>
                    {ingredient_map}
                </div>
                <div className="instruction_container">
                    <h3 className="instruction_title">Instructions</h3>
                    {instruction_map}
                </div>
                <div className="note_container">
                    <h3 className="note_title">Notes</h3>
                </div>
            </div>
        )
    }

} export default RecipeFull;
