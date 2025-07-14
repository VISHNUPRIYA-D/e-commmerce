import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { FaRegTrashAlt } from "react-icons/fa";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItem, updateQuantity, navigate, backendUrl } = useContext(ShopContext);
  
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    if(products.length > 0){
        const tempData = [];
    
    for (const _id in cartItem) {
      const sizeMap = cartItem[_id];
      for (const size in sizeMap) {
        const quantity = sizeMap[size];
        if (quantity > 0) {
        const product = products.find((p) => String(p._id) === String(_id));
        if (!product) {
          console.warn(`No product found with _id: ${_id}`);
          continue;
        }
          tempData.push({
            _id,
            size: size === "default" ? null : size,
            quantity,
            product,
          });
        }
      }
    }

    setCartData(tempData);
    }
  
  }, [cartItem, products]);

  return (
    <div>
      <Title text1={"CART "} text2={" ITEMS"} />
      {cartData.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartData.map((item, index) => (
          <div key={index} className="relative flex gap-4 items-start border-b py-4">
            <img
              src={`${backendUrl}/uploads/${item.product?.image_url}`}
              alt="Product"
              className="w-24 h-auto object-cover  rounded shrink-0"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg">
                {item.product?.product_name || "Unknown Product"}
              </h3>
              {item.size && (
                <p className="text-sm text-gray-600">Size: {item.size}</p>
              )}
              <p className="text-sm text-gray-600">Quantity :</p>
              <div>
                <input type='number' className="border max-w-10 sm:max-w-20 px-1 sm:px-1 mt-1 mb-1 " min={1} value={item.quantity } onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id,item.size,Number(e.target.value))}/>
              </div>
              <p className="text-sm font-semibold">
                Price: {currency} {item.product?.price.toFixed(2)}
              </p>
            </div>
             <FaRegTrashAlt className="absolute right-2 mt-1 sm:right-15 text-gray-600 cursor-pointer" onClick={()=>updateQuantity(item._id,item.size,0)}/>
          </div>
        ))
      )}
      {cartData.length > 0 &&  <div className="flex justify-end my-20 ">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={()=>navigate('/place-order')} className="w-full bg-black text-white text-sm py-1 my-5" >PROCEED TO CHECKOUT</button>
          </div>
        </div>

      </div>}
    </div>
  );
};

export default Cart;
