import React, { useEffect, useState, useRef } from "react";
import "../css/Favorite.css";
import { Button } from "reactstrap";

export default function Favorite({ user_id, recipe_id }) {
    const [isFavorite, setFavorite] = useState(false);
    const label = isFavorite ? "Remove Saved Recipe" : "Save Recipe";
    const [counter, setCounter] = useState("");

    useEffect(() => {
        if (user_id !== "") {
            _getFavorite(user_id, recipe_id);
            console.log('before:', counter);
            _getCounter(recipe_id);
            console.log('Counter:', counter, isFavorite);
        }
    });

    function incCounter() {
        let temp = Number(counter);
        temp += 1;
        setCounter(temp);
    }

    function decCounter() {
        let temp = Number(counter);
        temp -= 1;
        setCounter(temp);
    }

    // function _getAllFavorites() {
    //     fetch('http://127.0.0.1:5000/allfavorites', {
    //         method: 'GET'
    //     })  
    //     .then((response) => response.json())
    //     .then((data) => {
    //         let users = [];
    //         for (let i = 0; i < data.length; i++) {
    //             users.push(data[i]._id.$oid);
    //         }
    //         setAllUsers(users);
    //         console.log('all Users: ', allUsers);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
    // }

    function _getCounter(id) {
        fetch(`http://127.0.0.1:5000/recipe/${id}`, {
            method: 'GET'
        })  
        .then((response) => response.json())
        .then((data) => {
            setCounter(Number(data.counter));
            console.log('get count:', counter)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function updateCounter(id) {
        fetch(`http://127.0.0.1:5000/recipe/edit/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                counter: counter.toString()
            })
        }).then((response) => response.json())
        .then((data) => {
            console.log('update count:', counter)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    function _getFavorite(user_id, id) {
        fetch(`http://127.0.0.1:5000/favorites/${user_id}/${id}`, {
            method: 'GET'
        })  
        .then((response) => response.json())
        .then((data) => {
            setFavorite(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function _toggleFavorite() {
        fetch(`http://127.0.0.1:5000/favorite-recipe/${user_id}/${recipe_id}`, {
            method: 'POST'
        })  
        .then((response) => response.json())
        .then((data) => {
            // console.log('Successs:', data);
            setFavorite(!isFavorite);
            if (!isFavorite) {
                incCounter();
            } else {
                decCounter();
            }
            updateCounter(recipe_id);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="Favorite">
            <Button className="toggleFavorite" onClick={_toggleFavorite}> 
            {label} </Button> <p>Saved by: {counter}</p>
        </div>
    );
}