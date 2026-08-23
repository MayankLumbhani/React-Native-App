import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

export const connectDB = async () => {

    try{
        await mongoose.connect(MONGO_URI);
        console.log("Mongodb Connected");
    }
    catch (error) {
        console.log("Mongodb connection failed : ", error.message);
        process.exit(1);
    }

}