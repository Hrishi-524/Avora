import { useState, useEffect } from "react"
import Home from "./pages/Home"
import Listing from "./pages/Listing"
import Signup from "./pages/Signup"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import { setupAxiosInterceptors } from "./utils/auth"

function App() {
    // Initialize axios interceptors when app loads
    useEffect(() => {
        setupAxiosInterceptors();
    }, []);
    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path="/listings" element={<Home/>}/>
                <Route path="/listings/:id" element={<Listing/>}/>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </>
    )
}

export default App
