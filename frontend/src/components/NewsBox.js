import React from 'react'

const NewsBox = () => {
    const handleSubmit = (e) =>{
        e.preventDefault();
    }
  return (
    <div className='text-center mb-5'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now to get 30% offer</p>
      <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, labore?</p>

      <form onSubmit={handleSubmit}className='w-full sm:w-1/2 flex item-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none'type='email' placeholder='Enter your email' required/>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsBox
