import React from 'react'
import appLogo from '../assets/app-logo.png';
import smallAppLogo from '../assets/mini-app-logo.png'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center h-20 px-[4%] justify-between'>
       <picture>
          {/* Source for small devices  */}
          <source media='(max-width:410px)' srcSet={smallAppLogo}/>

          {/* Fallback for larger devices */}
          <img src={appLogo} alt="logo" className=" w-20 sm:w-32 rounded" />
        </picture>
      <button className='px-2 text-sm  bg-gray-500 rounded-full text-white' onClick={()=>setToken('')}>Logout</button>
    </div>
  )
}

export default Navbar
