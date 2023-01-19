import React from "react";
import "../css/Home.css";

export default function Home() {
  return (
    <div className="Home-Header">
      <h1>That's Cheesy <span>🧀</span></h1>
      <h3>Saved Recipes:</h3>
      <a href="/lasagna">Cheesy Lasagna</a>
      <br></br>
      <a href="/mac">Mac 'n Cheese</a>
    </div>
  );
}