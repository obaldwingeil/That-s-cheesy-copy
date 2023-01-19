import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./containers/Home";
import Login from "./containers/Login";

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
}