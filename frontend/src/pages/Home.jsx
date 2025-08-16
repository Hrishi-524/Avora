import Navbar from "../components/Home/Navbar.jsx"
import HeroSection from "../components/Home/HeroSection"
import Listings from "../components/Home/Listings"
import Footer from "../components/Home/Footer"
import { useEffect, useState } from "react"
import './Home.css'
import { fetchListings } from '../api/listings.js'
import Card from "../components/Home/Card.jsx"

export default function Home() {
    let [listings, setListings] = useState([]);
    const [searchResults, setSearchResults] = useState(null);

    //load listings on home page
    useEffect(() => {
        fetchListings()
        .then((data) => {
            setListings(data);
        })
        .catch(() => {})
    }, []);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    return(
        <div className="home-page">
            <Navbar />
            <div className="hero-background">
                <HeroSection onSearchComplete={handleSearchResults}/>
            </div>
            {searchResults && (
                <div className="listings-out search-results">
                    <h4>Search Results for "{searchResults.searchParams.location}" ({searchResults.count} found)</h4>
                    <div className="cards-collection-out">
                        {searchResults.results.map((listing) => (
                            <div key={listing._id} className="card-div-out">
                                <Card listing={listing}/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <Listings 
                listings={searchResults ? 
                    listings.filter(listing => 
                        !searchResults.results.some(result => result._id === listing._id)
                    ) : 
                    listings
                } 
                title={searchResults ? "Other Beautiful Places" : "Not sure where to ? Surf Beautiful Places Here"}
            />
            <Footer />
        </div>
    )
}