import React, { useState } from "react";
import "../css/AddRecipe.css";
import { Button, Form, FormGroup, Input } from "reactstrap";  
import { useNavigate } from "react-router";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [image, setImage] = useState([]);
  const [embedId, setEmbedId] = useState("");
  const [invalidURL, setInvalidURL] = useState(false);

  const navigate = useNavigate();

  const addrecipe = async () => {
    const rawResponse = await fetch('http://127.0.0.1:5000/addrecipe', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title, 
        ingredients: ingredients, 
        instructions: instructions, 
        image: image,
        embedId: embedId
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

  function _updateIngredients() {
    var new_ingredients = ingredients;
    new_ingredients.push(ingredient);
    setIngredients(new_ingredients);
    console.log(new_ingredients);
  }

  function _updateInstructions() {
    var new_instructions = instructions;
    new_instructions.push(instruction);
    setInstructions(new_instructions);
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
          <FormGroup className="AddRecipe-input"> 
            <Input
              type="text"
              value={ingredient}
              id="AddRecipe-input"
              placeholder="Ingredient"
              onChange={(e) => setIngredient(e.target.value)}
              required
            />
            <Button onClick={_updateIngredients} className="AddIngredient">
                Add Ingredient
            </Button>
          </FormGroup>
          <FormGroup className="AddRecipe-input"> 
            <Input
              type="text"
              value={instruction}
              id="AddRecipe-input"
              placeholder="Instruction"
              onChange={(e) => setInstruction(e.target.value)}
              required
            />
            <Button onClick={_updateInstructions} className="AddInstruct">
                Add Instruction
            </Button>
          </FormGroup>
          <FormGroup className="User-input"> 
            <Input
              type="textarea"
              id="User-input"
              placeholder="Comments"
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