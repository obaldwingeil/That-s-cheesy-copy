import React from "react";
import "../css/Navigation.css"

export default function Navigation() {
    return (
        <div className="nav">
            <div className="nav-left">
                <a class="links" href="/">Home</a>
            </div>
            <div className="nav-right">
                <a class="links" href="/login">Log In</a>
                <a class="links" href="/addrecipe">Add Recipe</a>
            </div>
        </div>
    );
}