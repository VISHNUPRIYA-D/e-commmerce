import React, { useContext, useState } from "react";
import appLogo from "../assets/app-logo.png";
import smallAppLogo from "../assets/mini-app-logo.png"
import { Link, NavLink } from "react-router-dom";
import {
  IoIosSearch,
  IoMdPerson,
  IoMdCart,
  IoIosArrowDropleft,
} from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {setShowSearch, getCartCount,navigate,token,setToken,setCartItem} = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItem({})
    navigate('/login')
  }
  return (
    <div className="flex items-center justify-between font-medium xs:mt-[-15px] mt-2">
      <Link to='/'>
        <picture className="cursor-pointer">
          {/* Source for small devices  */}
          <source media="(max-width: 440px)" srcSet={smallAppLogo}/>

          {/* Fallback for larger devices */}
          <img src={appLogo} alt="logo" className=" xs:w-32 rounded w-10" />
        </picture>
      </Link>
      

      <ul className="hidden sm:flex gap-5 taxt-sm text-gray-700 ">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"></hr>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        <IoIosSearch className="text-xl cursor-pointer" onClick={()=>{setShowSearch(true)}}/>
        
          <div  className="group relative">
            <IoMdPerson onClick={()=>navigate('/login')} className="text-xl cursor-pointer" />
            {token && <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded ">
                <p className="cursor-pointer hover:text-black">My profile</p>
                <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p className="cursor-pointer hover:text-black" onClick={logout}>Logout</p>
              </div>
            </div>}
            
          </div>
  
        <Link to="/cart" className="relative">
          <IoMdCart className="text-xl cursor-pointer" />
          <p className="absolute right-[-5px] bottom-[-3px] w-3 text-center leading-2 bg-yellow-300 text-black aspext-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <IoMenu
          onClick={() => setVisible(true)}
          className="text-xl cursor-pointer sm:hidden"
        />
      </div>
      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white trnasition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="felx flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-2 p-3 cursor-pointer"
          >
            <IoIosArrowDropleft className="text-xl cursor-pointer" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="block py-2 pl-6 border "
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="block py-2 pl-6 border "
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="block py-2 pl-6 border "
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="block py-2 pl-6 border "
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
