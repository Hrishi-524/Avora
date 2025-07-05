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
		return <div>Loading listing...</div>;
	}

    return (
        <div className="listing">
            <h4>{listing.title}</h4>
            <ImageCarousel listing={listing}/>
            <ListingDetails listing={listing} />
            <Reviews listing={listing} />
        </div>
    )
}