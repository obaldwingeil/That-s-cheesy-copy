import React from "react";
import "../css/Navigation.css"

export default function Navigation() {
    return (
        <div className="nav">
            <div className="nav-left">
                <a className="links" href="/">Home</a>
            </div>
            <div className="nav-right">
                <a className="links" href="/login">Log In</a>
                <a className="links" href="/addrecipe">Add Recipe</a>
            </div>
        </div>
    );
}