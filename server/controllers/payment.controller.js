import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/payment.model.js";
import { CLIENT_URL } from "../utls/constants.js";

// step 1: Create a order
export const checkout = async (req, res) => {
   try {
     const { order_name, amount } = req.body;
 
     // make options for create order
     const options = {
         amount: Number(amount * 100), // need to multiply by 100
         currency: "INR",
         // receipt: "order_rcptid_11"
     };
     const order = await instance.orders.create(options)
     const order_id = order.id;
       console.log(order);
 
     // create in db
     const newPayment = await Payment.create({ razorpay_order_id: order_id, order_name, amount,  })
     if (!newPayment)
         res.status(500).json({ success: false });
 
     res.status(200).json({ success: true, order });
   } catch (error) {
       console.log(`Error during order generation ${error}`);
   }
}

export const paymentVerification = async (req, res) => {
    try {
        // Extract payment details from the request body
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex");

        // console.log(razorpay_signature)
        // console.log(expectedSignature);

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // save data to database

            // udpate the docs
            await Payment.findOneAndUpdate(
                { razorpay_order_id },
                {
                    $set: { razorpay_payment_id, razorpay_signature, status: "success" },
                }, {
                new: true
            });
            res.redirect(`${CLIENT_URL}/paymentsuccess?reference=${razorpay_payment_id}`)
        } else {
            res.status(400).json({ success: false, message: "Server Failed" });
        }

        // Respond to the client with a success message
        // res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } catch (error) {
        // Handle any errors
        console.error('Error in payment verification:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};