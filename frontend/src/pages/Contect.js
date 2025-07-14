import React from 'react'
import Title from '../components/Title'
import contact_image from '../assets/assets.js/contact.jpeg'

const Contect = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t' >
        <Title text1={'CONTECT '} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px] border' src={contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-2 text-gray-600'>
          <p className='text-xl text-gray-800 font-semibold'>Our Store</p>
          <p>Street: 123 Main Street</p>
          <p>City: Springfield</p>
          <p>State: IL</p>
          <p>ZIP: 62704</p>
          <p>Country: United States</p>
          <p>Phone: +1 (555) 123-4567</p>

          <button className='bg-black text-white px-3 py-1'>Explore more</button>

        </div>
      </div>
    </div>
  )
}

export default Contect
