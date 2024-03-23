import mongoose from "mongoose";
import { DB_NAME } from "../utls/constants.js";

const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(`DB connected at ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log(`Mongodb connection failed!!`);
        process.exit(1);
    }
}

export default connectToDB;