import { Schema, model } from 'mongoose';

const listingSchema = new Schema({
    title : {
        type : String,
        required: true
    },
    type : {
        type : String,
    },
    address : {
        type : String,
    },
    description : {
        type : String,
        required : true
    },
    hostContact : {
        type : String,
    },
    amenities : [
        String
    ],
    images : [{
        filename : {
            type : String,
        }, 
        featured : {
            type : Boolean,
        },
        url : {
            type : String
        }
    }],
    price : {
        type : Number,
        required : true
    }, 
    location : {
        type : String,
        required : true
    },
    country : {
        type : String
    },
    host : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    reviews : [{
        type : Schema.Types.ObjectId,
        ref : 'Review',
    }],
    averageRating : {
        type : Number,
        default : 3,
    }
},{
    timestamps: true,
})

const Listing = model('Listing', listingSchema);
export default Listing;
