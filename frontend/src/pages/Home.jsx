import Navbar from "../components/Home/Navbar.jsx";
import HeroSection from "../components/Home/HeroSection";
import Listings from "../components/Home/Listings";
import Footer from "../components/Home/Footer";
import { useEffect, useState } from "react";
import "./Home.css";
import { fetchListings } from "../api/listings.js";
import Card from "../components/Home/Card.jsx";

const bgImages = ["/images/bg1.webp", "/images/bg2.webp", "/images/bg3.webp"];

export default function Home() {
  let [listings, setListings] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

  // 🔥 background slider
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchListings()
      .then((data) => {
        setListings(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bgImages.length);
    }, 15000); // change every 6s

    return () => clearInterval(interval);
  }, []);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="home-page">
      <Navbar />

      {/* Sliding background */}
      <div className="hero-slider">
        {bgImages.map((img, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        <HeroSection onSearchComplete={handleSearchResults} />
      </div>

      {searchResults && (
        <div className="listings-out search-results">
          <h4>
            Search Results for "{searchResults.searchParams.location}" (
            {searchResults.count} found)
          </h4>
          <div className="cards-collection-out">
            {searchResults.results.map((listing) => (
              <div key={listing._id} className="card-div-out">
                <Card listing={listing} />
              </div>
            ))}
          </div>
        </div>
      )}

      <Listings
        listings={
          searchResults
            ? listings.filter(
                (listing) =>
                  !searchResults.results.some(
                    (result) => result._id === listing._id
                  )
              )
            : listings
        }
        title={searchResults ? "other places to explore" : ""}
      />

      <Footer />
    </div>
  );
}
