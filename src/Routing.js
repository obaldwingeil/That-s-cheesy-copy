import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddRecipe from "./components/AddRecipe";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Navigation from "./containers/Navigation";
import RecipeFull from "./containers/RecipeFull";
import EditRecipe from "./components/EditRecipe";
import { HomeContainer } from "./containers/HomeContainer";
import { LoginContainer } from "./containers/LoginContainer";
import { LogoutContainer } from "./containers/LogoutContainer";
import { NavigationContainer } from "./containers/NavigationContainer";
import { RecipeFullContainer } from "./containers/RecipeFullContainer";
import { AddRecipeContainer } from "./components/AddRecipeContainer";
import { EditRecipeContainer } from "./components/EditRecipeContainer";

export default function Routing() {
    return (
        <BrowserRouter>
            <NavigationContainer></NavigationContainer>
            <Routes>
                <Route path='/' element={<HomeContainer/>} />
                <Route path='/login' element={<LoginContainer/>} />
                <Route path='/logout' element={<LogoutContainer/>} />
                <Route path='/addrecipe' element={<AddRecipeContainer/>} />
                <Route path='/recipe/edit/:id' element={<EditRecipe/>} />
                <Route path='/recipe/edit/:id' element={<EditRecipeContainer/>} />
                <Route path='/recipe/:id' element={<RecipeFull/>} />
                <Route path='/recipe/:id' element={<RecipeFullContainer/>} />
            </Routes>
        </BrowserRouter>
    );
}