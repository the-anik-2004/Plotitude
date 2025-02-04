import React, { useContext, useState } from 'react'
import "./login.scss"
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest.js';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [error,setError]=useState("");
  const [isLoading,setIsLoading]=useState(false);
  const navigate=useNavigate();
  const {updateUser}=useContext(AuthContext);

  const handleSubmit=async (e)=>{
    e.preventDefault();
    setIsLoading(true);
    setError("")
    const formData=new FormData(e.target);
     
    const username=formData.get("username");
    const password=formData.get("password");

    try {
      const res= await apiRequest.post("/auth/login",{username,password});

      // localStorage.setItem("user",JSON.stringify(res.data));
      updateUser(res.data)
      navigate("/")

    } catch (error) {
      setError(error.message)
    }
    finally{
      setIsLoading(false);
    }
    
  }
  return (
    <div className='login'>
      <div className="textContainer">
            <h1>Welcome back</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" required minLength={3} maxLength={30} placeholder='Username'/>
                <input type="password" name="password" required placeholder='Password'/>
                <button className="btn" disabled={isLoading}>Login</button>
                {error && <span style={{color:"red"}}>{error}</span>}
            <Link to="/register" className='link'>Don't you have an account?</Link>
            </form>
      </div>

      <div className="imgContainer">
         <img src="/bg.png" alt="background Image" />
      </div>
    </div>
  )
}

export default Login;
