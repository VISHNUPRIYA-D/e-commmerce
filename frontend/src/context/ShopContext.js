import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl =
    process.env.REACT_APP_BACKEND_URL ||"https://e-commmerce-tbns.onrender.com";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(undefined);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserCart = async(token)=>{
    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`,{},{headers:{token}})
      if(response.data.success){
        setCartItem(response.data.cartData)
      }
    } catch (error) {
       console.log(error.message);
       toast.error(error.message);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
     const saved = localStorage.getItem("token");
  if (saved) {
    setToken(saved);
    getUserCart(saved);
  } else {
    setToken(null);
  }
}, []);
  const addToCart = async (itemId, size = "default") => {
    let cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {[size]:1};
    }
    setCartItem(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (err) {}
      }
    }
    return totalCount;
  };
const updateQuantity = async (itemId, size = "default", quantity) => {
  // against negative quantities
  if (quantity < 0) return;

  const cartData = structuredClone(cartItem);

  if (!cartData[itemId]) {
    console.warn(`Item ${itemId} not in cart`);
    return;
  }
  if (!cartData[itemId][size]) {
    console.warn(`Size '${size}' not found for ${itemId}`);
    return;
  }

  // 3️⃣ Update or remove
  if (quantity === 0) {
    // Remove the size entry entirely
    delete cartData[itemId][size];

    // If that leaves no sizes, remove the product
    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }
  } else {
    cartData[itemId][size] = quantity;
  }

  setCartItem(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
         console.log(error);
        toast.error(error.message);
      }
    }
  };
  const getCartAmount = () => {
    let cartAmount = 0;

    for (const items in cartItem) {
      const itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) {
        console.warn(`Product with _id=${items} not found in products list.`);
        continue;
      }

      for (const size in cartItem[items]) {
        const quantity = cartItem[items][size];
        if (quantity > 0) {
          cartAmount += itemInfo.price * quantity;
        }
      }
    }

    return cartAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    backendUrl,
    search,
    navigate,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    setToken,
    token,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
