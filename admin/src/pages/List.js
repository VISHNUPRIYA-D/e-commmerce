import React, { useContext, useEffect, useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext.js";
import { TbTrash } from "react-icons/tb";


const List = ({token}) => {
  const [list, setList] = useState([]);
  const {currency} = useContext(ShopContext);
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.products) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id)=>{
    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`,{id},{headers:{token}});
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList();
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message)
      
    }
  }
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="p-4 space-y-4">
      <p className="m-auto">All Products List</p>
      <div>
        <table className="w-full table-auto border-seperate  border-spacing-y-5">
          <thead>
            <tr>
              <th className="border px-4 py-1 shadow ">Image</th>
              <th className="border px-4 py-1 shadow">Name</th>
              <th className="border px-4 py-1 shadow">Price</th>
              <th className="border px-4 py-1 shadow">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index} className="">
                <td>
                  <img
                    src={
                      item.image_url.startsWith("http")
                        ? item.image_url
                        : `${backendUrl}/uploads/${item.image_url}`
                    }
                    alt={item.product_name}
                    className="w-16 h-auto object-cover rounded-md mx-auto my-2"
                  />
                </td>
                <td>{item.product_name}</td>
                <td>{currency}{item.price.toFixed(2)}</td>
                <td onClick={()=>removeProduct(item._id)} className="flex justify-center items-center mt-11 text-red-700 hover:text-red-950 cursor-pointer"><TbTrash/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
