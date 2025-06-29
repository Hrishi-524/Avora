const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        filename : {
            type : String,
        }, 
        url : {
            type : String
        }
    },
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
    }
})

module.exports = mongoose.model('Listing', listingSchema);