import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import Stripe from "../assets/assets.js/stripe.jpeg";
import { ShopContext } from "../context/ShopContext.js";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    cartItem,
    setCartItem,
    token,
    products,
    getCartAmount,
    delivery_fee,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name; //gets the name of the input field
    const value = e.target.value; // gets the value the user just typed.

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!products || products.length === 0) {
        console.error("Product list is not loaded yet.");
        return toast.error("Please wait, products are still loading.");
      }

      let orderItems = [];
      for (const itemId in cartItem) {
        const sizesObj = cartItem[itemId];

        for (const size in sizesObj) {
          const quantity = sizesObj[size];

          if (quantity > 0) {
            const product = products.find((p) => p._id === itemId);

            if (!product) {
              console.warn(
                `Product with _id=${itemId} not found in product list.`
              );
              continue; // Skip unknown product
            }

            const itemInfo = structuredClone(product);
            itemInfo.quantity = quantity;
            itemInfo.size = size === "default" ? null : size;

            orderItems.push(itemInfo);
          }
        }
      }
      if (orderItems.length === 0) {
        return toast.error("Your cart is empty.");
      }

      // Now send the order to backend
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        case "cod":
          const response = await axios.post(
            `${backendUrl}/api/order/cash`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItem({});
            console.log("New cartItem:", cartItem);
            console.log(response.data);
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <form
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
      onSubmit={handleOnSubmit}
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
        />
        <input
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Pincode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            onChange={onChangeHandler}
            name="pincode"
            value={formData.pincode}
            required
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Phone number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          required
        />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
          <div className="mt-12">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                onClick={() => setMethod("stripe")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded ${
                    method === "stripe" ? "bg-blue-400" : ""
                  }`}
                ></p>
                <img className="h-5 mx-4 " src={Stripe} />
              </div>
              <div
                onClick={() => setMethod("cod")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded ${
                    method === "cod" ? "bg-blue-400" : ""
                  }`}
                ></p>
                <p className="text-gray-600 text-md">CASH ON DELIVERY</p>
              </div>
            </div>
            <div className="w-full text-end mt-8">
              <button type="submit" className="bg-black text-white w-full py-1">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
