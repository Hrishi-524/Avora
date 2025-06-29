import Card from "./Card";
import './Listings.css'

export default function Listings({listings}) {
    return (
        <div className="listings"> 
            <h3>Explore Bookings</h3>
            <div className="cards-collection">
                {listings.map((listing) => {
                    return (
                        <div key={listing._id} className="card-div">
                            <Card listing={listing}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}