    import { useState, useEffect } from "react"
    import Home from "./pages/Home"
    import Listing from "./pages/Listing"
    import Signup from "./pages/Signup"
    import Host from "./pages/Host"
    import { Routes, Route } from "react-router-dom"
    import Login from "./pages/Login"
    import { setupAxiosInterceptors } from "./utils/auth"
    import Profile from "./pages/Profile"
import Edit from "./pages/Edit"

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
                    <Route path="/host" element={<Host/>}></Route>
                    <Route path="/user/:id" element={<Profile/>}></Route>
                    <Route path="/user/:id/listings/edit/:id" element={<Edit/>}></Route>
                </Routes>
            </>
        )
    }

    export default App
