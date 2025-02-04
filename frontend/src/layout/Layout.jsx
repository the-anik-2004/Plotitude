import React, { useContext } from 'react';
import "./layout.scss";
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';



const Layout = () => {
  return ( 
    <div className="layout">
      <div className="navbar">
        <Navbar/>
       </div>
       
       <div className="content">
          <Outlet/>
        </div> 
    
    {/* <Footer/> */}

    </div>
  )
}

const RequiredAuth = () => {
  const {currentUser}=useContext(AuthContext);



  return ( 
    !currentUser ? <Navigate to="/login"/> : 
    (<div className="layout">
      <div className="navbar">
        <Navbar/>
       </div>
       
       <div className="content">
          <Outlet/>
        </div> 
    
    {/* <Footer/> */}

    </div>)
  )
}

export {Layout,RequiredAuth};
