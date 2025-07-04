import Home from "./pages/Home"
import Listing from "./pages/Listing"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/listings" element={<Home/>}/>
        <Route path="/listings/:id" element={<Listing/>}/>
      </Routes>
    </>
  )
}

export default App
