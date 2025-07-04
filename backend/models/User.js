import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username : {
        type : String,
    },
    email : {
        type : String,
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
})

const User = model('User', userSchema);
export default User;