import express from "express";
import cors from "cors";
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: CLIENT_URL,
}))


import PaymentRoute from "./routes/router.js";
import { CLIENT_URL } from "./utls/constants.js";
app.use("/api", PaymentRoute )


app.get("/api/getkey", (_, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
})

export { app }

