import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {

  const [reference, setReference] = useState("");
  const searchQuery = useSearchParams()[0];

  
  useEffect(() => {
    const getReferences = searchQuery.get("reference");
    setReference(getReferences);
  },[searchQuery])

  return (
    <>
      <div className="h-screen flex justify-center items-center flex-col">
        <div className="heading">
          <h1 className="text-2xl font-bold uppercase">Order Successfull</h1>
        </div>
        <div className="description">
          <p className="" >Reference No : {reference} </p>
        </div>
        <div className="button_home mt-3">
          <Link to="/" className="text-xl uppercase text-blue-600 hover:text-blue-700 font-semibold" >HOME</Link>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
