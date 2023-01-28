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
            instructions: [],
            image: "",
            embedId: "",
            invalidURL: false
        }
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeIngredient = this.onChangeIngredient.bind(this);
        this.onChangeInstruction = this.onChangeInstruction.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this._updateIngredients = this._updateIngredients.bind(this);
        this._updateInstructions = this._updateInstructions.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
        this._getEmbedId = this._getEmbedId.bind(this);
        this._cancel = this._cancel.bind(this);
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
                instructions: data.instructions,
                image: data.image,
                embedId: data.embedId
            });
            // console.log(id, data.title, data.ingredients, data.instructions, data.image)
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

    onChangeImage(e) {
        this.setState({ image: e.target.value })
    }

    // onChangeImage(e) {
    //     if (e.target.files && e.target.files[0]) {
    //         let img = e.target.files[0];
    //         this.setState({
    //             image: URL.createObjectURL(img)
    //         });
    //     }
    // };

    editRecipe(id) {
        fetch(`http://127.0.0.1:5000/recipe/edit/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title, 
                ingredients: this.state.ingredients, 
                instructions: this.state.instructions, 
                image: this.state.image,
                embedId: this.state.embedId
            })
        })
        .then ((response) => response.json())
        .then ((data) => {console.log(data)})
        this.props.router.navigate(`/recipe/${this.state.recipe_id}`);
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

    _getEmbedId(event) {
        if (event === "") {
            this.setState({
                embedId: "",
                invalidURL: false
            });
        } else {
            const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
            const match = event.match(regExp);
            if (match === null) {
                this.setState({
                    invalidURL: true
                });
            } else {
                this.setState({
                    embedId: match[1],
                    invalidURL: false
                });
            }
        }
    }

    _cancel() {
        this.props.router.navigate(`/recipe/${this.state.recipe_id}`);
    }

    render() {
        const ingredient_map = this.state.ingredients.map(i => {
            return(<div>
                <li className="ingredient">{i}
                <button onClick={() => {
                    this.setState({ingredients:
                    this.state.ingredients.filter(function(ing) {
                        return ing !== i
                    })});
                }}>Delete</button></li>
                </div>)
        })

        const instruction_map = this.state.instructions.map(i => {
            return(<div>
                <li className="instruction">{i}
                <button onClick={() => {
                    this.setState({instructions:
                    this.state.instructions.filter(function(ins) {
                        return ins !== i
                    })});
                }}>Delete</button></li>
                </div>)
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
                            />
                        </FormGroup>
                        <br></br>
                        <img width="400" src={this.state.image} />
                        <br></br>
                        <FormGroup className="EditRecipe-input">
                            <Input
                            type="text"
                            value={this.state.image}
                            id="image-input"
                            className="EditRecipe-input"
                            placeholder="Image URL"
                            onChange={this.onChangeImage}
                            />
                        </FormGroup>
                        {/* <h3>Select Image</h3>
                        <input type="file" name="myImage" onChange={this.onChangeImage} /> */}
                        <div className="youtubeInput container">
                            {this.state.invalidURL ? <div className="invalidURL">
                                Invalid URL
                            </div> : <div/>}
                            <FormGroup className="AddRecipe-input">
                            <Input
                                type="text"
                                id="AddYoutubeURL-input"
                                placeholder="Youtube URL"
                                onBlur={(e) => this._getEmbedId(e.target.value)}
                                defaultValue={this.state.embedId === "" ? "" : "https://youtu.be/" + this.state.embedId}
                            />
                            </FormGroup>
                        </div>
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
                    <Button className="cancel_button" onClick={this._cancel}>
                        Cancel
                    </Button>
                    <Button onClick={() => this.editRecipe(this.state.recipe_id)} className="EditRecipe">
                        Update Recipe
                    </Button>
                </div>
            </div>
        );
    }
} export default withRouter(EditRecipe);