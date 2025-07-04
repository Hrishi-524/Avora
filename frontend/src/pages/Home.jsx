import Navbar from "../components/Home/Navbar.jsx"
import HeroSection from "../components/Home/HeroSection"
import Listings from "../components/Home/Listings"
import Footer from "../components/Home/Footer"
import { useEffect, useState } from "react"
import './Home.css'
import { fetchListings } from '../api/listings.js'

export default function Home() {
    let [listings, setListings] = useState([]);

    //load listings on home page
    useEffect(() => {
        fetchListings()
        .then((data) => {
            setListings(data);
        })
        .catch(() => {})
    });


    return(
        <div className="home-page">
            <div className="hero-background">
                <Navbar />
                <HeroSection />
            </div>
            <Listings listings={listings} />
            <Footer />
        </div>
    )
}