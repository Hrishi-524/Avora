import { Schema, model } from 'mongoose';

const listingSchema = new Schema({
    title : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required : true
    },
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
})

const Listing = model('Listing', listingSchema);
export default Listing;
