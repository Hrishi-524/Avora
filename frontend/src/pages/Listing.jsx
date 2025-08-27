import { useEffect, useState , Suspense, lazy} from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './Listing.css'
import { fetchListingById } from '../api/listings';
import ImageCarousel from '../components/Listing/ImageCarousel';
import ListingDetails from '../components/Listing/ListingDetails';
import Reviews from '../components/Listing/Reviews';
import Map from '../components/Listing/Map';

export default function Listing() {
    let [listing, setListing] = useState({});
    let params = useParams();
    const navigate = useNavigate()

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
            <div>
                <button 
                    onClick={() => navigate('/')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'black',
                        fontFamily: 'var(--ff)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '1    rem',
                        opacity: '0.9',
                        padding: '0.5rem 0'
                    }}
                >
                    &#8592; Back to Home
                </button>
            </div>
            <div className="image-comp">
                <ImageCarousel listing={listing}/>
                <h1>{listing.title}</h1>
            </div>  
            <div className="info">
                <ListingDetails listing={listing} />
                <Reviews listing={listing} />
                <Suspense fallback={<div>Loading map...</div>}>
                    <Map listing={listing}/>
                </Suspense>
            </div>
        </div>
    )
}