import React, { useState } from "react";
import "../css/AddRecipe.css";
import { Button, Form, FormGroup, Input } from "reactstrap";  

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [instruction, setInstruction] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const addrecipe = async () => {
    const rawResponse = await fetch('http://127.0.0.1:5000/addrecipe', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: title, ingredients: ingredients, instructions: instructions})
    });
    const content = await rawResponse.json();
  
    console.log(content);
  };

  function _updateIngredients() {
    var new_ingredients = ingredients;
    new_ingredients.push(ingredient);
    setIngredients(new_ingredients);
    console.log(new_ingredients);
  }

  function _updateInstructions() {
    const new_instructions = instructions;
    new_instructions.push(instruction);
    setInstructions(new_instructions);
    console.log(new_instructions);
  }

  return (
    <div className="main">
      <div className="AddRecipe-header">
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
        <Button onClick={addrecipe} className="AddRecipe">
          Add
        </Button>
      </div>
    </div>
  );
}