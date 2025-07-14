import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.js";
import Title from "../components/Title.js";
import axios from "axios";

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const placeOrderItems = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrderItems = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;

            allOrderItems.push(item);
          });
        });
        console.log(allOrderItems);

        setOrderData(allOrderItems.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      placeOrderItems();
    }
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"YOUR "} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className=" py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                className="w-16 sm:w-28"
                src={`${backendUrl}/uploads/${item.image_url}`}
                alt=""
              />
              {/*product details */}
              <div className="flex flex-col gap-1 sm:text-base items-left ">
                <p className="sm:text-base font-medium">{item.product_name}</p>
                <p>
                  {currency}
                  {item.price}
                </p>
                <p>Quantity: {item.quantity}</p>
                {item.size !== "" && <p>Size: {item.size}</p>}

                <p>
                  Date:{" "}
                  <span className="text-gray-400 ">
                    {new Date(item.date).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </p>
                <p>
                  Payment:{" "}
                  <span className="text-gray-400 ">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:ml-auto sm:w-fit">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <p className="text-sm sm:text-base whitespace-nowrap">
                {item.status}
              </p>
            </div>

            <div>
              <button className="border rounded px-3 py-1 cursor-pointer" onClick={placeOrderItems}>
                Track order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
