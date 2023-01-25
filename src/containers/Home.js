import React from "react";
import "../css/Home.css";
import RecipeListHolder from "./RecipeListHolder";
import { useLocation } from "react-router-dom";

export default function Home() {

  const location = useLocation();

  return (
    <div className="Home-Header">
      <h1>That's Cheesy <span>🧀</span></h1>
      <h3>My Saved Recipes:</h3>
      <RecipeListHolder saved={true} user_id={location.state.user_id}/>
      <br></br>
      <h3>All Recipes:</h3>
      <RecipeListHolder saved={false} user_id={location.state.user_id}/>
    </div>
  );
}
