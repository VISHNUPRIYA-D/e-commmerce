import React from 'react'
import { GiCardExchange } from "react-icons/gi";
import { IoBagCheck } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <GiCardExchange className='m-auto text-3xl mb-5 text-black'/>
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>Enjoy worry-free shopping with our easy exchange policy</p>
        </div>
        <div>
            <IoBagCheck className='m-auto text-3xl mb-5 text-black'/>
            <p className='font-semibold'>7 Days Return Policy</p>
            <p className='text-gray-400'>Shop with confidence—7-day returns guaranteed</p>
        </div>
        <div>
            <MdSupportAgent className='m-auto text-3xl mb-5 text-black'/>
            <p className='font-semibold'>Best Customer Support</p>
            <p className='text-gray-400'>Need help? Our support team is always here for you</p>
        </div>
      
    </div>
  )
}

export default OurPolicy
