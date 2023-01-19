import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./containers/Home";

export default function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
            </Routes>
        </BrowserRouter>
    );
}