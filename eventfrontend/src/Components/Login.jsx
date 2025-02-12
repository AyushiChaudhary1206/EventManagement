import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
   const[email,setemail]=useState("");
   const[password,setpassword]=useState("");
   const navigate=useNavigate();
 const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
     const res=await axios.post("https://eventmanagementbackend-hlij.onrender.com/api/v1/login", {
      email,
      password,
    },{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    })
    toast.success("Login successfull");
    localStorage.setItem("token",res.data.token);
    setTimeout(()=>{
      navigate("/dashboard");
    },2000)
   
  }
    catch(error){
    toast.error("Login Failed");
    console.log(error);
    }
 }
  return (
   
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 ">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-6 shadow-lg shadow-purple-500 transition-all"
          >
            <h1 className="text-3xl font-bold text-purple-700 text-center">
             Login
            </h1>
    
    
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={e=>{setemail(e.target.value)}}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your Email"
                required
              />
            </div>
    
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                
                type="password"
                onChange={e=>{setpassword(e.target.value)}}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your Password"
                required
              />
            </div>
    
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
            <div className="text-center">
            <span>Dont have an account?<a href='/' className='pl-2 text-bold text-purple-700 cursor-pointer'>Register Here</a></span>
            </div>
          </form>
          <ToastContainer position="top-right" autoClose={5000} pauseOnHover closeOnClick />
        </div>
  );
};

export default Login;
