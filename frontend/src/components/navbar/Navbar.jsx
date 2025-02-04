import React, { useContext, useState } from 'react'
import "./navbar.scss"
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { useNotificationStore } from '../../lib/notificationStore';



const Navbar = () => {
  const [open,setOpen]=useState(false);  
  const {currentUser}= useContext(AuthContext);

  const fetch=useNotificationStore(state=>state.fetch);
  const number=useNotificationStore(state=>state.number);

  fetch();
  // const user=currentUser.isAdmin;
  // let userData=currentUser?.data||null;
  
  // console.log(userData)
  return (
    <nav>
      <div className="left">

        <a href="/" className='logo'>
          <img src="icon.ico" alt="Plotitude" />
          <span>Plotitude</span>
        </a>
        <a href="/">Home</a>
        <a href="">About</a>
        <a href="">Contacts</a>
        <a href="">Agents</a>
      </div>
      
      <div className="right">
        {
          currentUser? (
          <div className='profile'>
            <img src={currentUser.avatar|| "./noAvatar.jpeg"} alt={currentUser.username||"profile image"}  className='ndp'/>
            <Link to="/profile" className='dp'>
              {number>0&& <div className="mobNotification">{number}</div>}
              <img src={currentUser.avatar|| "./noAvatar.jpeg"} alt={currentUser.username||"profile image"} />
            </Link>
            <span>{currentUser.username || null}</span>
            <Link to="/profile" className='register'>
             {number>0 && <div className="notification">{number}</div>}
              <p>Profile</p>
            </Link>
          </div>

          ):
          (
            <>
             <a href="/login">Sign in</a>
              <a href="/register" className='register'>Sign up</a>
             
            </>
          )
        }
         <div className="menuIcon">
                <img src="menu.png" alt="Menu Button" onClick={()=>setOpen(!open)}/>
              </div>
              <div className={open?'menu active':'menu'}>
              <a href="">Home</a>
              <a href="">About</a>
              <a href="">Contacts</a>
              <a href="">Agents</a>
              <a href="">Sign in</a>
              <a href="" >Sign up</a>
            
        </div>
       
      </div>
    </nav>
  )
}

export default Navbar;
