import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
    order_name: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
    },
    razorpay_order_id: {
        type: String,
    },
    razorpay_signature: {
        type: String,
    },
    status: {
        type: String,
        enum: ["success", "failure", "pending"],
        default: "failure"
    }

}, {
    timestamps: true
})


export const Payment = model("Payment", paymentSchema);