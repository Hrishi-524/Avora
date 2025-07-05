import 'dotenv/config'
import { connect } from 'mongoose';
import bcrypt from 'bcrypt'; // Add missing bcrypt import
import { data } from './data.js';
import Listing from '../models/Listing.js';
import Review from '../models/Review.js';
import User from '../models/User.js'

const MONGOOSE_URL = "mongodb+srv://Hrishi:DV71lKee1mOmF9ZF@cluster0.t1iub2a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
    await connect(MONGOOSE_URL)
}

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
    try {
        //delete everything from all models
        await Listing.deleteMany({});
        await Review.deleteMany({}); 
        await User.deleteMany({});
        console.log("old data deleted");

        //reinitialize with putting sample data in all models again

        //user model reinitialization
        const adminPassword = "dev"
        //hash password
        const saltRounds = 10;
        const hash = await bcrypt.hash(adminPassword, saltRounds);
        const admin = new User({
            username : "devloper",
            email : "devloper@gmail.com",
            isHost : true,
            password : hash,
        });
        await admin.save();
        console.log("Admin user created");

        //listing model reinitialization
        await Listing.insertMany(data);
        console.log("Sample listings inserted");

        //make admin as host of these listings
        const hostAdmin = await User.findOne({username : "devloper"});
        await Listing.updateMany({}, { host: hostAdmin._id });
        console.log("Host assigned to all listings");

        console.log("Database initialized successfully!");
        process.exit(0); // Exit successfully
    } catch (error) {
        console.error("Error initializing database:", error);
        process.exit(1);
    }
}

initDB();