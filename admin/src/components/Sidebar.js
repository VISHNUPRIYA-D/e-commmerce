import React from 'react'
import { NavLink } from 'react-router-dom';
import { CiCirclePlus } from "react-icons/ci";
import { TbShoppingBagCheck } from "react-icons/tb";


const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[10%] text-[15px]'>
        <NavLink to='/add' className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded">
            <CiCirclePlus className='text-xl'/>
            <p className='hidden sm:block'>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded">
            <TbShoppingBagCheck className='text-xl'/>
            <p className='hidden sm:block'>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded">
            <TbShoppingBagCheck className='text-xl'/>
            <p className='hidden sm:block'>Shop Items</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar
