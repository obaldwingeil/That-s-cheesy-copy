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
            invalidURL: false,
            notes: "",
            noUser: this.props.user_id === "no user",
            invalidTitle: false,
            ingredientLimitReached: false,
            instructionLimitReached: false,
            noIngredients: false,
            noInstructions: false
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
        this.onChangeNotes = this.onChangeNotes.bind(this);
        this.updateNotes = this.updateNotes.bind(this);
        this._getNotes = this._getNotes.bind(this);
        this._invalidList = this._invalidList.bind(this);
        this._deleteIngredient = this._deleteIngredient.bind(this);
        this._deleteInstruction = this._deleteInstruction.bind(this);
    }

    componentDidMount() {
        const id = this.props.router.params.id;
        this.setState({ recipe_id: id });
        fetch(`http://127.0.0.1:8000/recipe/${id}`, {
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

        if(!this.state.noUser) this._getNotes(id); 
    }

    _getNotes(id) {
        fetch(`http://127.0.0.1:8000/notes/${this.props.user_id}/${id}`, {
            method: 'GET'
        })  
        .then((response) => response.json())
        .then((data) => {
            // console.log('Successs:', data);
            if (data !== "No Notes Yet!") {
                this.setState({
                    notes: data
                });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    onChangeTitle(e) {
        if (e.target.value === "") this.setState({ invalidTitle: true });
        else this.setState({ title: e.target.value, invalidTitle: false })
    }

    onChangeIngredient(e) {
        this.setState({ ingredient: e.target.value })
    }

    onChangeInstruction(e) {
        this.setState({ instruction: e.target.value })
    }

    onChangeImage(e) {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            this.setState({
                image: URL.createObjectURL(img)
            });
        }
    };

    onChangeNotes(e) {
        this.setState({ notes: e.target.value });
    }

    editRecipe(id) {
        fetch(`http://127.0.0.1:8000/recipe/edit/${id}`, {
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
        .then ((data) => {
            console.log(data)
            if(!this.state.noUser) this.updateNotes();
            else this.props.router.navigate(`/recipe/${this.state.recipe_id}`);
        })
    }

    updateNotes() {
        fetch(`http://127.0.0.1:8000//notes/update-note/${this.props.user_id}/${this.state.recipe_id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                note: this.state.notes
            })
        })
        .then ((response) => response.json())
        .then ((data) => {console.log(data)})
        .then(this.props.router.navigate(`/recipe/${this.state.recipe_id}`));
    }

    _invalidList(list) {
        const res = [false, false]
        if (list.length < 1) res[0] = true;
        if (list.length >= 10) res[1] = true;
        return res;
    }
  
    _updateIngredients() {
        var new_ingredients = this.state.ingredients;
        if (this.state.ingredient !== "") new_ingredients.push(this.state.ingredient);
        const limit = this._invalidList(new_ingredients);
        this.setState({
            ingredients: new_ingredients,
            ingredient: "",
            noIngredients: limit[0],
            ingredientLimitReached: limit[1]
        });
        // console.log(new_ingredients);
    }

    _updateInstructions() {
        var new_instructions = this.state.instructions;
        if (this.state.instruction !== "") new_instructions.push(this.state.instruction);
        const limit = this._invalidList(new_instructions);
        this.setState({
            instructions: new_instructions,
            instruction: "",
            noInstructions: limit[0],
            instructionLimitReached: limit[1]
        });
        // console.log(new_instructions);
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

    _deleteIngredient(ingredient) {
        var new_ingredients = this.state.ingredients.filter(function(ing) {
            return ing !== ingredient
        });
        const limit = this._invalidList(new_ingredients);
        this.setState({
            ingredients: new_ingredients,
            noIngredients: limit[0],
            ingredientLimitReached: limit[1]
        });
    }

    _deleteInstruction(instruction) {
        var new_instructions = this.state.instructions.filter(function(ing) {
            return ing !== instruction
        });
        const limit = this._invalidList(new_instructions);
        this.setState({
            instructions: new_instructions,
            noInstructions: limit[0],
            instructionLimitReached: limit[1]
        });
    }

    render() {
        const ingredient_map = this.state.ingredients.map(i => {
            return(<div>
                <li className="ingredient">{i}
                <button onClick={() => this._deleteIngredient(i)}>Delete Ingredient</button></li>
                </div>)
        })

        const instruction_map = this.state.instructions.map(i => {
            return(<div>
                <li className="instruction">{i}
                <button onClick={() => this._deleteInstruction(i)}>Delete Instruction</button></li>
                </div>)
        })

        return (
            <div className="main">
                <div className="EditRecipe-header">
                    <Form>
                        <h1 className="title">{this.state.title}</h1>
                        {this.state.invalidTitle ? <div className="invalidTitle">Invalid Title</div> : <div/>}
                        <FormGroup className="EditRecipe-input">
                            <Input
                            type="text"
                            defaultValue={this.state.title}
                            id="title-input"
                            className="EditRecipe-input"
                            placeholder="Title"
                            onBlur={this.onChangeTitle}
                            maxLength={64}
                            />
                        </FormGroup>
                        <br></br>
                        <img width="400" src={this.state.image} />
                        <br></br>
                        <h3>Select Image</h3>
                        <input type="file" name="myImage" onChange={this.onChangeImage} />
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
                        <div className="ingredientDisplay">
                            <h3>Ingredients</h3>
                            {ingredient_map}
                            {this.state.ingredientLimitReached ? <div className="limitReached">Ingredient Limit Reached (Max: 10)</div>: <div/>}
                            {this.state.noIngredients ? <div className="limitReached">Must include at least 1 ingredient</div> : <div />}
                        </div>
                        <br></br>
                        <FormGroup className="EditRecipe-input"> 
                            <Input
                            type="text"
                            value={this.state.ingredient}
                            id="EditRecipe-input"
                            placeholder="Ingredient"
                            onChange={this.onChangeIngredient}
                            />
                            <Button 
                                onClick={this._updateIngredients} 
                                className="UpdateIngredient"
                                disabled={this.state.ingredientLimitReached}
                            >
                                Add Ingredient
                            </Button>
                        </FormGroup>
                        <br></br>
                        <div className="instructionDisplay">
                            <h3>Instructions</h3>
                            {instruction_map}
                            {this.state.instructionLimitReached ? <div className="limitReached">Instruction Limit Reached (Max: 10)</div>: <div/>}
                            {this.state.noInstructions ? <div className="limitReached">Must include at least 1 instruction</div> : <div />}
                        </div>
                        <br></br>
                        <FormGroup className="EditRecipe-input"> 
                            <Input
                            type="text"
                            value={this.state.instruction}
                            id="EditRecipe-input"
                            placeholder="Instruction"
                            onChange={this.onChangeInstruction}
                            />
                            <Button 
                                onClick={this._updateInstructions} 
                                className="UpdateInstruct"
                                disabled={this.state.instructionLimitReached}
                            >
                                Add Instruction
                            </Button>
                        </FormGroup>
                        <br></br>
                        {this.state.noUser ? <div className="noUserMessage">Log in to add personal notes!</div> : <div/>}
                        <FormGroup className="User-input"> 
                            <Input
                            type="textarea"
                            id="User-input"
                            placeholder="Personal Notes"
                            maxLength={250}
                            onBlur={this.onChangeNotes}
                            defaultValue={this.state.notes}
                            disabled={this.state.noUser}
                            />
                        </FormGroup>
                    </Form>
                    <br></br>
                    <Button className="cancel_button" onClick={this._cancel}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={() => this.editRecipe(this.state.recipe_id)} 
                        className="EditRecipe"
                        disabled={this.state.noIngredients || this.state.noInstructions || this.state.invalidTitle || this.state.invalidURL}
                    >
                        Update Recipe
                    </Button>
                </div>
            </div>
        );
    }
} export default withRouter(EditRecipe);