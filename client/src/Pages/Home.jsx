import Card from "../components/Card";
import axios from "axios";
import { productArray } from "../utils/products";
import React from "react";
import { host } from "../utils/API";

const Home = () => {
  const checkoutHandler = async (order_name, amount) => {
    try {
      const {
        data: { key },
      } = await axios.get(`${host}/api/getkey`);

      // console.log("order done key : ", key);

      const {
        data: { order },
      } = await axios.post(`${host}/api/checkout`, {
        order_name,
        amount,
      });
      // console.log("order is : ", order);
      // console.log(data);
      // console.log(window)

      const options = {
        key,
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Lokeshwar Prasad", //your business name
        description: "Test Transaction",
        image:
          "https://instagram.fbho1-1.fna.fbcdn.net/v/t51.2885-19/305946608_1628552167547126_7673507004722463632_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fbho1-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=gOyRt6oY1ZEAX95wvCl&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfDojeLv-gdbPBlyDSg62yrW9vIdxDES9W_86zGbcBpVqg&oe=65FF6CA0&_nc_sid=8b3546",
        order_id: order.id,
        // this below callbak url automatically done post request with three razorpay values
        callback_url: `${host}/api/paymentverification`,
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: "Lokeshwar", //your customer's name
          email: "gaurav@example.com",
          contact: "7879431869", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#1c222c",
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(`Error during payment verification ${error}`);
    }
  };

  return (
    <>
      <div className="home_container h-full flex justify-center items-center flex-col mt-5 gap-3 ">
        <h2 className="text-2xl font-semibold font-overpass">
          {" "}
          Payment Integration 😎
        </h2>
        <div className="products_container font-overpass flex justify-center items-center gap-5 flex-wrap">
          {productArray.map((product, index) => {
            return (
              <React.Fragment key={index}>
                <Card
                  amount={product.amount}
                  img={product.path}
                  name={product.name}
                  checkoutHandler={checkoutHandler}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
