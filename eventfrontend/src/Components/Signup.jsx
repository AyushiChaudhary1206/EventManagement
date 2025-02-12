import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignupForm = () => {
   const[name,setname]=useState("");
   const[email,setemail]=useState("");
   const[password,setpassword]=useState("");
   const navigate=useNavigate();
   const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post("https://eventmanagementbackend-hlij.onrender.com/api/v1/signup", {
        name,
        email,
        password,
      });
      toast.success("Signup Sucessfull")
 localStorage.setItem("token", response.data.token);
 setTimeout(()=>{
  navigate("/dashboard");
 },2000);
     
    
    } catch (error) {
      toast.error("Signup Failed");
      console.log(error);
    }
  };





  return (

        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 ">
          <form
          onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-6 shadow-lg shadow-purple-500 transition-all"
          >
            <h1 className="text-3xl font-bold text-purple-700 text-center">
             SignUp
            </h1>
    
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
               onChange={e=>{setname(e.target.value)}}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-700 focus:border-purple-700"
                placeholder="Your Name"
                required
              />
            </div>
    
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
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit
              </button>
              OR
              <Link to="/guestmode">
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
             
         Guest Mode
       
              </button>
              </Link>
            </div>
            <div className="text-center">
            <span >Already Registered?<a href='/login' className='pl-2 text-bold text-purple-700 cursor-pointer'>Login Here</a></span>
            </div>
          </form>
          <ToastContainer/>
        </div>
  );
};

export default SignupForm;
