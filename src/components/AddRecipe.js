import React from "react";
import "../css/AddRecipe.css";
import { Button, Form, FormGroup, Input } from "reactstrap";  

export default function AddRecipe() {
  return (
    <div className="main">
      <div className="AddRecipe-header">
        <Form>
          <FormGroup className="AddRecipe-input">
            <Input
              type="text"
              id="title-input"
              className="AddRecipe-input"
              placeholder="Title"
            />
          </FormGroup>
          <FormGroup className="AddRecipe-input"> 
            <Input
              type="text"
              id="AddRecipe-input"
              placeholder="Ingredient"
            />
            <Button className="AddIngredient">
                Add Ingredient
            </Button>
          </FormGroup>
          <FormGroup className="AddRecipe-input"> 
            <Input
              type="text"
              id="AddRecipe-input"
              placeholder="Instruction"
            />
            <Button className="AddInstruct">
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
        <Button className="AddRecipe">
          Add
        </Button>
      </div>
    </div>
  );
}