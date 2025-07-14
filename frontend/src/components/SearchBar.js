import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoIosSearch } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
    const [visible,setVisible] = useState(false)
    const location = useLocation();

    useEffect(()=>{
      if(location.pathname.includes('collection')){
        setVisible(true);
      }else{
        setVisible(false);
      }
    },[location])
  return (
    <>
      {showSearch && visible && (
        <div className="border-t border-b bg-gray-5 text-center h-12">
          <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-1 my-2  mx-3 rounded-full w-3/4 sm:w-1/2">
            <input
              type="text"
              placeholder="Search.."
              className="flex-1 outline-none bg-inherit text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />{" "}
            <IoIosSearch />
          </div>
          <RxCross1
            onClick={() => setShowSearch(false)}
            className="inline cursor-pointer"
          />
        </div>
      )}
    </>
  );
};

export default SearchBar;
