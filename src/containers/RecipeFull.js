import React, { Component } from "react";
import "../css/RecipeFull.css";
import withRouter from "./WithRouter";

class RecipeFull extends Component {

    constructor() {
        super();
        this.state = {
            recipe_id: "",
            title: "",
            ingredients: [],
            instructions: [],
            notes: ""
        }
        this._getRecipe = this._getRecipe.bind(this);
        
    }

    componentDidMount() {
        const id = this.props.router.params.id;
        this.setState({
            recipe_id: id
        });
        this._getRecipe(id);
        this._getNotes(id);
    }

    _getRecipe(id) {
        // console.log(`http://127.0.0.1:5000/recipe/${id}`);
        fetch(`http://127.0.0.1:5000/recipe/${id}`, {
            method: 'GET'
        })  
        .then((response) => response.json())
        .then((data) => {
            // console.log('Successs:', data);
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

    _getNotes(id) {
        const user_id = "63c89100b1cd9206c4989fb8" // temporary will change with real user id
        fetch(`http://127.0.0.1:5000/notes/${user_id}/${id}`, {
            method: 'GET'
        })  
        .then((response) => response.json())
        .then((data) => {
            // console.log('Successs:', data);
            this.setState({
                notes: data
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
                    {this.state.notes}
                </div>
            </div>
        )
    }

} export default withRouter(RecipeFull);
