import React, { useState } from 'react'
import "./register.scss"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import apiRequest from '../../lib/apiRequest.js';

const Register = () => {
  const [error,setError]=useState("");
  const [isLoading,setIsLoading]=useState(false);

  const navigate=useNavigate();
  const handleSubmit=async (e)=>{
    e.preventDefault();
    setIsLoading(true)
    setError("");
    const formData=new FormData(e.target);
    const username=formData.get("username");
    const email=formData.get("email");
    const password=formData.get("password");

    try {
      const res=await apiRequest.post("/auth/register",{
        username,email,password
      });
      console.log(res.data)
      navigate("/login")
    } catch (error) {
      setError(error.message);
    } finally{
      setIsLoading(false)
    }
    // console.log(`Username:${username}\n Email:${email}\n Password:${password}\n`);
  }
  return (
    <div className='registerUser'>
      <div className="textContainer">
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" required minLength={3} maxLength={30} placeholder='Username'/>
                <input type="email" required minLength={10}name="email" placeholder='Email'/>
                <input type="password" required name="password" placeholder='Password'/>
                <button className="btn" disabled={isLoading} >Register</button>
                {error && <span style={{color:"red"}}>{error}</span>}
            <Link to="/login" className='link'>Do you have an account?</Link>
            </form>
      </div>

      <div className="imgContainer">
         <img src="/bg.png" alt="background Image" />
      </div>
    </div>
  )
}

export default Register;
