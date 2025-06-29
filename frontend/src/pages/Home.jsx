import Navbar from '../components/Navbar.jsx'
import HeroSection from "../components/HeroSection"
import Listings from "../components/Listings"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import axios from 'axios';
import './Home.css'

export default function Home() {
    let [listings, setListings] = useState([]);

    useEffect(() => {
    axios.get('/api/listings').then(
        (res) => {
            console.log(res.data);
            setListings(res.data);
        }
    ).catch((err) => {
        console.error("Failed to fetch listings:", err);
    });
    }, []);


    return(
        <div className="home-page">
            <div className="hero-background">
                <Navbar />
                <HeroSection />
            </div>

            {/* Now scroll starts here */}
            <Listings listings={listings} />
            <Footer />
        </div>
    )
}