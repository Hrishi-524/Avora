import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import './Listing.css'
import { fetchListingById } from '../api/listings';
import ImageCarousel from '../components/Listing/ImageCarousel';
import ListingDetails from '../components/Listing/ListingDetails';
import Reviews from '../components/Listing/Reviews';

export default function Listing() {
    let [listing, setListing] = useState({});
    let params = useParams();

    useEffect(() => {
        fetchListingById(params.id, localStorage.getItem('token'))
        .then((data) => {
            setListing(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [params.id]);

    if (!listing || !listing.images) {
		return (
			<div className="loading-container">
				<div className="loading-spinner"></div>
				<p>Loading listing details...</p>
			</div>
		);
	}

    return (
        <div className="listing">
            <div className="image-comp">
                <ImageCarousel listing={listing}/>
            </div>
            <div className="info">
                <h1>{listing.title}</h1>
                <ListingDetails listing={listing} />
                <Reviews listing={listing} />
            </div>
        </div>
    )
}