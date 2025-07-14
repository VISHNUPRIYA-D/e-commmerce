import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const Login = ({setToken}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const handleOnSubmit = async (e) =>{
        try{
            e.preventDefault();
            console.log(backendUrl+'/api/user/admin');
            
            const response = await axios.post(backendUrl+'/api/user/admin',{email,password});
            if(response.data.success){
                setToken(response.data.token)
            }else{
                toast.error(response.data.message)
            }
            
        }catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white  shadow-md rounded px-8 py-6 max-w-md'>
        <h1 className='text-2xl  font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={handleOnSubmit}>
            <div className='mb-3 min-w-72'>
                <p className='text-gray-600 text-sm mb-2'>Email :</p>
                <input className='rounded w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='example@gmail.com' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
             <div className='mb-3 min-w-72'>
                <p className='text-gray-600 text-sm mb-2'>Password :</p>
                <input className='rounded w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type='submit' className='w-full bg-black text-white py-2 rounded'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
