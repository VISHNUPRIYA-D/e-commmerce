import React, { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Verify = () => {
  
  //const queryParams = new URLSearchParams(location.search);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success") ;
  const orderId = searchParams.get("orderId");

 

  const { backendUrl, token, navigate, setCartItem } = useContext(ShopContext);

  
    const VerifyPayment = async () => {
    try {
      if (!token ) {
        return null;
      }
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId},
        {headers: {token} },
      );
      console.log("Token :",token);
      console.log('response:',response.data);
      
       if(response.data.success){
          setCartItem({});
          navigate('/orders')
        }else{
          navigate('/cart')
        }
    } catch (error) {
          console.log(error.message);
    
    }
  };

  useEffect(()=>{
    if(token === undefined)return;
    VerifyPayment();
  },[token]);
  

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center">
        {success ? (
          <>
            <FaCheckCircle
              className="text-green-500 w-16 h-16 mx-auto mb-4"
              size={64}
            />
            <h2 className="text-2xl font-semibold mb-2">Payment Successful</h2>
            <p className="text-gray-600 mb-6">
              Thank you! Your order has been placed successfully. You can view
              your orders in your account.
            </p>
            <Link
              to="/orders"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              View Orders
            </Link>
          </>
        ) : (
          <>
            <FaTimesCircle
              className="text-red-500 w-16 h-16 mx-auto mb-4"
              size={64}
            />
            <h2 className="text-2xl font-semibold mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">
              Something went wrong during the transaction. Please try again or
              contact support.
            </p>
            <Link
              to="/"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Back to Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Verify;
