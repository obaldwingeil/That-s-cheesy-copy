import React, { useEffect, useState } from "react";
import "../css/Favorite.css";
import { Button } from "reactstrap";

export default function Favorite({ user_id, recipe_id }) {
    const [isFavorite, setFavorite] = useState(false);
    const label = isFavorite ? "Remove Saved Recipe" : "Save Recipe";

    useEffect(() => {
        if (user_id !== ""){
            _getFavorite(user_id, recipe_id);
        }
    });

    function _getFavorite(user_id, id) {
        fetch(`http://127.0.0.1:8000/favorites/${user_id}/${id}`, {
            method: 'GET'
        })  
        .then((response) => response.json())
        .then((data) => {
            // console.log('Successs:', data);
            setFavorite(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function _toggleFavorite() {
        fetch(`http://127.0.0.1:8000/favorite-recipe/${user_id}/${recipe_id}`, {
            method: 'POST'
        })  
        .then((response) => response.json())
        .then((data) => {
            // console.log('Successs:', data);
            setFavorite(!isFavorite);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="Favorite">
            <Button className="toggleFavorite" onClick={_toggleFavorite}> 
            {label} </Button>
        </div>
    );
}