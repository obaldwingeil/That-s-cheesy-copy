import React from "react";
import "../css/Home.css";
import RecipeListHolder from "./RecipeListHolder";

export default function Home() {


  return (
    <div className="Home-Header">
      <h1>That's Cheesy <span>🧀</span></h1>
      <h3>My Saved Recipes:</h3>
      <RecipeListHolder saved={true} />
      <br></br>
      <h3>All Recipes:</h3>
      <RecipeListHolder saved={false} />
    </div>
  );
}
