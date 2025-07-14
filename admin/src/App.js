import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import Orders from './pages/Orders'
import Login from './components/Login'
import List from './pages/List'
import { ToastContainer } from 'react-toastify';

export const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://e-commmerce-tbns.onrender.com"

const App = () => {
  const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer position='top-right' autoClose={3000}/>
      {token === "" ? <Login setToken={setToken}/> : 
      <div>
          <div>
      <Navbar setToken={setToken}/>
      <hr />
      </div>
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
          <Routes>
              <Route path='/' element={<List />} />
            <Route path='/add' element={<Add token={token}/>}/>
            <Route path='/list' element={<List token={token}/>}/>
            <Route path='/orders' element={<Orders token={token}/>}/>
          </Routes>
        </div>
      </div>
      </div>
      }
      

    </div>
  )
}

export default App
