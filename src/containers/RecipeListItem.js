import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RecipeListItem.css";

export default function RecipeListItem({ id, title, ingredients, instructions, user_id }) {

    const navigate = useNavigate();
    
    function handleClick() {
        navigate(`/recipe/${id}`, {state: {user_id: user_id}});
    }

    return(
        <div className="RecipeListItem" onClick={handleClick}>
            <div className="title">{title}</div>
        </div>
    )

}