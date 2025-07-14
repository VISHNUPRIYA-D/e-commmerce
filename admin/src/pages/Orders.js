import React, { useContext, useEffect, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBoxArchive } from "react-icons/fa6";
import { ShopContext } from "../context/ShopContext";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const { currency } = useContext(ShopContext);
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async(e,orderId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/order/status`,{orderId,status:e.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-lg font-semibold my-4 text-gray-800">Order Page</h3>

      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 border border-gray-200 rounded-xl p-4 md:p-6 my-4 text-sm text-gray-700 shadow-sm"
          >
            {/* 1. Icon */}
            <div className="flex items-start justify-center pt-1">
              <FaBoxArchive className="text-2xl text-gray-600" />
            </div>

            {/* 2. Items List */}
            <div>
              {order.items.map((item,index) => (
                <p key={index+'-'+item._id} className="break-words mb-1">
                  {item.product_name} x {item.quantity}
                  {item.size && <span className="ml-1">({item.size})</span>}
                </p>
              ))}
            </div>

            {/* 3. Address */}
            <div className="whitespace-pre-line">
              <p className="font-semibold mb-1">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street}</p>
              <p>
                {order.address.city}, {order.address.state}
              </p>
              <p>
                {order.address.country}, {order.address.pincode}
              </p>
              <p>{order.address.phone}</p>
            </div>

            {/* 4. Meta Info */}
            <div className="space-y-1">
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "✅ Done" : "⏳ Pending"}</p>
              <p>
                Date:{" "}
                {new Date(order.date).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>

            {/* 5. Amount + Status */}
            <div className="space-y-2">
              <p className="font-semibold text-base">
                {currency} {order.amount.toFixed(2)}
              </p>
              <select onChange={(e)=>statusHandler(e,order._id)} className="w-full p-1 rounded border border-gray-300 text-sm bg-white" value={order.status} >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
