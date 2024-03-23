import { config } from "dotenv";
config({ path: "./.env" }); // for server
// config({ path: "./.env.sample" }); // for locally
import Razorpay from "razorpay";
import { app } from "./app.js";
import connectToDB from "./db/conn.js";
const PORT = process.env.PORT || 3000;


export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
})




connectToDB()
    .then(() => {
        app.on("error", () => {
            console.log(`Error during connected to db`);
            throw error
        })
        app.listen(PORT, () => {
            console.log(`Server listen at ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(`${error}`);
    })