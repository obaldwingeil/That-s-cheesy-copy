import React, { Component } from "react";
import "../css/EditRecipe.css";
import { Button, Form, FormGroup, Input } from "reactstrap";
import withRouter from "../containers/WithRouter";

class EditRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe_id: "",
            title: "",
            ingredient: "",
            instruction: "",
            ingredients: [],
            instructions: []
        }
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeIngredient = this.onChangeIngredient.bind(this);
        this.onChangeInstruction = this.onChangeInstruction.bind(this);
        this._updateIngredients = this._updateIngredients.bind(this);
        this._updateInstructions = this._updateInstructions.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
    }

    componentDidMount() {
        const id = this.props.router.params.id;
        fetch(`http://127.0.0.1:5000/recipe/${id}`, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                recipe_id: id,
                title: data.title,
                ingredients: data.ingredients,
                instructions: data.instructions
            });
            console.log(id, data.title, data.ingredients, data.instructions)
        })
        .catch (function(error) {
            console.log(error)
        })
    }

    onChangeTitle(e) {
        this.setState({ title: e.target.value })
    }

    onChangeIngredient(e) {
        this.setState({ ingredient: e.target.value })
    }

    onChangeInstruction(e) {
        this.setState({ instruction: e.target.value })
    }

    editRecipe(id) {
        fetch(`http://127.0.0.1:5000/recipe/edit/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: this.state.title, ingredients: this.state.ingredients, instructions: this.state.instructions})
        })
        .then (this.setState({ redirect: true}));
    }
  
    _updateIngredients() {
        var new_ingredients = this.state.ingredients;
        new_ingredients.push(this.state.ingredient);
        this.setState({ingredients: new_ingredients});
        console.log(new_ingredients);
    }

    _updateInstructions() {
        var new_instructions = this.state.instructions;
        new_instructions.push(this.state.instruction);
        this.setState({instructions: new_instructions});
        console.log(new_instructions);
    }

    render() {
        const ingredient_map = this.state.ingredients.map(i => {
            return(<li className="ingredient">{i}</li>)
        })

        const instruction_map = this.state.instructions.map(i => {
            return(<li className="instruction">{i}</li>)
        })

        return (
            <div className="main">
                <div className="EditRecipe-header">
                    <Form>
                        <h1 className="title">{this.state.title}</h1>
                        <FormGroup className="EditRecipe-input">
                            <Input
                            type="text"
                            value={this.state.title}
                            id="title-input"
                            className="EditRecipe-input"
                            placeholder="Title"
                            onChange={this.onChangeTitle}
                            required
                            />
                        </FormGroup>
                        <br></br>
                        {ingredient_map}
                        <br></br>
                        <FormGroup className="EditRecipe-input"> 
                            <Input
                            type="text"
                            value={this.state.ingredient}
                            id="EditRecipe-input"
                            placeholder="Ingredient"
                            onChange={this.onChangeIngredient}
                            required
                            />
                            <Button onClick={this._updateIngredients} className="UpdateIngredient">
                                Update Ingredient
                            </Button>
                        </FormGroup>
                        <br></br>
                        {instruction_map}
                        <br></br>
                        <FormGroup className="EditRecipe-input"> 
                            <Input
                            type="text"
                            value={this.state.instruction}
                            id="EditRecipe-input"
                            placeholder="Instruction"
                            onChange={this.onChangeInstruction}
                            required
                            />
                            <Button onClick={this._updateInstructions} className="UpdateInstruct">
                                Update Instruction
                            </Button>
                        </FormGroup>
                        <br></br>
                        <FormGroup className="User-input"> 
                            <Input
                            type="textarea"
                            id="User-input"
                            placeholder="Comments"
                            />
                        </FormGroup>
                    </Form>
                    <br></br>
                    <Button onClick={() => this.editRecipe(this.state.recipe_id)} className="EditRecipe">
                        Update Recipe
                    </Button>
                </div>
            </div>
        );
    }
} export default withRouter(EditRecipe);