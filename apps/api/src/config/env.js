import dotenv from "dotenv";

dotenv.config();

const requiredEnv = ["MONGO_URI"];

for(const key of requiredEnv) {
    if(!process.env[key]){
        throw new Error(`Missing required environment variable : ${key}`)
    }
}

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI;