import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddRecipe from "./components/AddRecipe";
import { HomeContainer } from "./containers/HomeContainer";
import { LoginContainer } from "./containers/LoginContainer";
import { LogoutContainer } from "./containers/LogoutContainer";
import { NavigationContainer } from "./containers/NavigationContainer";
import RecipeFull from "./containers/RecipeFull";

export default function Routing() {
    return (
        <BrowserRouter>
            <NavigationContainer></NavigationContainer>
            <Routes>
                <Route path='/' element={<HomeContainer/>} />
                <Route path='/login' element={<LoginContainer/>} />
                <Route path='/logout' element={<LogoutContainer/>} />
                <Route path='/addrecipe' element={<AddRecipe/>} />
                <Route path='/recipe/:id' element={<RecipeFull/>} />
            </Routes>
        </BrowserRouter>
    );
}