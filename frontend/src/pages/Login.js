import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const {token,setToken,navigate,backendUrl} = useContext(ShopContext);
  const [name,setName] = useState('');
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')



  const handleOnSubmit = async (e) =>{
    e.preventDefault();
    try {
      if(currentState === 'Sign Up'){
        //Signup  process with api
       const response = await axios.post(`${backendUrl}/api/user/register`,{name,email,password})
       if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem('token',response.data.token)
       }else{
        toast.error(response.data.message)
       }     

      }else{
        //Login (or) Signin  process with api
        const response = await axios.post(`${backendUrl}/api/user/login`,{email,password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
        }else{
          toast.error(response.data.message);
        }
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <div>
      <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto  gap-4 text-gray-600" onSubmit={handleOnSubmit}>
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="text-2xl">{currentState}...</p>
        </div>

        {currentState !== "Login" && (
          <input
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-700 rounded"
            placeholder="Name"
            required
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-700 rounded"
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-700 rounded"
          placeholder="Password"
          required
        />

        <div className="w-full flex flex-col text-sm mt-[-8px]">
          <div className="w-full flex">
            <p className="cursor-pointer ml-auto hover:text-blue-900">
              Forgot your password?
            </p>
          </div>
          <div className="w-full flex justify-center items-center mt-5  hover:underline decoration-blue-900 transition-all transition hover:text-blue-900">
            {currentState === "Login" ? (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className="cursor-pointer"
              >
                Create account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("Login")}
                className="cursor-pointer "
              >
                Login Here
              </p>
            )}
          </div>
        </div>
        <button className="bg-black text-white px-3 py-1 rounded">{currentState === 'Login' ? 'LogIn' : 'Sign Up'}</button>
      </form>
    </div>
  );
};

export default Login;
