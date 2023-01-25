import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddRecipe from "./components/AddRecipe";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Navigation from "./containers/Navigation";
import RecipeFull from "./containers/RecipeFull";
import EditRecipe from "./components/EditRecipe";

export default function Routing() {
    return (
        <BrowserRouter>
            <Navigation></Navigation>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/addrecipe' element={<AddRecipe/>} />
                <Route path='/recipe/edit/:id' element={<EditRecipe/>} />
                <Route path='/recipe/:id' element={<RecipeFull/>} />
            </Routes>
        </BrowserRouter>
    );
}