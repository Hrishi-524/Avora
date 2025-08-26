import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    isHost : {
        type : Boolean,
        default : false,
    },
    profileImage : {
        type : String,
    },
    bio : {
        type : String,
    },
    hostRating : {
        type : Number,
    }, 
    personalContact : {
        type: Number,
    }
})

const User = model('User', userSchema);
export default User;