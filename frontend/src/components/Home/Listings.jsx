import Card from "./Card";
import './Listings.css'

export default function Listings({listings, title}) {
    return (
        <div className="listings"> 
            <h4>{title || ""}</h4>
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