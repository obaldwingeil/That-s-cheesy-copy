import React, { useState } from "react";
import "../css/AddRecipe.css";
import { Button, Form, FormGroup, Input } from "reactstrap";  
import { useNavigate } from "react-router";

export default function AddRecipe({ user_id }) {
  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [image, setImage] = useState("");
  const [embedId, setEmbedId] = useState("");
  const [invalidURL, setInvalidURL] = useState(false);
  const [note, setNote] = useState("");
  const [noUser, setNoUser] = useState(user_id === "no user");
  const [ingredientMap, setIngredientMap] = useState([]);
  const [instructionMap, setInstructionMap] = useState([]);

  const navigate = useNavigate();

  const addrecipe = async () => {
    const rawResponse = await fetch('http://127.0.0.1:8000/addrecipe', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipe: {
          title: title, 
          ingredients: ingredients, 
          instructions: instructions, 
          image: image,
          embedId: embedId
        },
        notes: {
          note: note,
          user_id: user_id
        }
      })
    });
    const content = await rawResponse.json();
    // console.log(content);

    navigate('/');
  };

  const cancel = () => {
    navigate('/');
  }

  const onChangeImage = event => {
    if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        setImage(
          URL.createObjectURL(img)
        );
    }
  }

  function _getEmbedId(event) {
    if (event === "") {
      setEmbedId("");
      setInvalidURL(false);
    } else {
      const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
      const match = event.match(regExp);
      if (match === null) {
        setInvalidURL(true);
      } else {
        setEmbedId(match[1]);
        setInvalidURL(false);
      }
    }
  }

  function _updateIngredients(add, toDelete) {
    var new_ingredients = ingredients;
    if (add) new_ingredients.push(ingredient);
    else new_ingredients.splice(new_ingredients.indexOf(toDelete), 1);
    setIngredients(new_ingredients);
    setIngredientMap(
      new_ingredients.map(i => {
        return(
          <div>
            <li className="ingredient">{i}
            <button onClick={() => _updateIngredients(false, i)}>Delete Ingredient</button></li>
          </div>)
        }
      )
    );
    console.log(new_ingredients);
  }

  function _updateInstructions(add, toDelete) {
    var new_instructions = instructions;
    if (add) new_instructions.push(instruction);
    else new_instructions.splice(new_instructions.indexOf(toDelete), 1);
    setInstructions(new_instructions);
    setInstructionMap(
      new_instructions.map(i => {
        return(
          <div>
            <li className="instruction">{i}
            <button onClick={() => _updateInstructions(false, i)}>Delete Instruction</button></li>
          </div>)
        }
      )
    );
    console.log(new_instructions);
  }

  return (
    <div className="main">
      <div className="AddRecipe-header">
        <h1 className="AddRecipe-title">
          Add Your New Recipe Below
        </h1>
        <Form>
          <FormGroup className="AddRecipe-input">
            <Input
              type="text"
              value={title}
              id="title-input"
              className="AddRecipe-input"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormGroup>
          <div className="imageInput">
            <img width="400" src={image} />
            <h3>Select Image</h3>
            <input type="file" name="myImage" onChange={onChangeImage} />
          </div>
          <div className="youtubeInput container">
            {invalidURL ? <div className="invalidURL">
              Invalid URL
            </div> : <div/>}
            <FormGroup className="AddRecipe-input">
              <Input
                type="text"
                defaultValue=""
                id="AddYoutubeURL-input"
                placeholder="Youtube URL"
                onBlur={(e) => _getEmbedId(e.target.value)}
              />
            </FormGroup>
          </div>
          <div className="ingredientDisplay">
            <h3>Ingredients</h3>
            {ingredientMap}
          </div>
          <FormGroup className="AddRecipe-input"> 
            <Input
              type="text"
              value={ingredient}
              id="AddRecipe-input"
              placeholder="Ingredient"
              onChange={(e) => setIngredient(e.target.value)}
              required
            />
            <Button onClick={() => _updateIngredients(true, null)} className="AddIngredient">
                Add Ingredient
            </Button>
          </FormGroup>
          <div className="instructionDisplay">
            <h3>Instructions</h3>
            {instructionMap}
          </div>
          <FormGroup className="AddRecipe-input"> 
            <Input
              type="text"
              value={instruction}
              id="AddRecipe-input"
              placeholder="Instruction"
              onChange={(e) => setInstruction(e.target.value)}
              required
            />
            <Button onClick={() => _updateInstructions(true, null)} className="AddInstruct">
                Add Instruction
            </Button>
          </FormGroup>
          {noUser ? <div className="noUserMessage">Log in to add personal notes!</div> : <div/>}
          <FormGroup className="User-input"> 
            <Input
              type="textarea"
              id="User-input"
              placeholder="Personal Notes"
              maxLength={250}
              onChange={(e) => setNote(e.target.value)}
              disabled={noUser}
            />
          </FormGroup>
        </Form>
        <Button className="cancel_button" onClick={cancel}>
          Cancel
        </Button>
        <Button onClick={addrecipe} className="AddRecipe">
          Add
        </Button>
      </div>
    </div>
  );
}