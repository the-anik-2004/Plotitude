import React, { useContext, useEffect ,useState} from 'react'
import "./profile.scss";

import List from '../../components/list/List.jsx';
import Chat from '../../components/chat/Chat.jsx';
import apiRequest from '../../lib/apiRequest.js';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import {ClipLoader} from "react-spinners"
import { useLoaderData } from 'react-router-dom';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [postData,setPostData]=useState(null);
  const [savePostData,setSavePostData]=useState(null);
  const dataFormLoader=useLoaderData();

    useEffect(()=>{
      setLoading(true);
      setPostData(dataFormLoader.postResponse.data.userPosts);
      setSavePostData(dataFormLoader.postResponse.data.savedPosts);
      setLoading(false);
       
    },[dataFormLoader])

  const navigate=useNavigate();
  const {currentUser,updateUser}=useContext(AuthContext);
  
  
  const handleLogout=async ()=>{
    try{
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    }catch(err){
     console.log(err);
    }
  }


  console.log(dataFormLoader.postResponse.data)
  console.log(dataFormLoader.chatResponse.data)
  return (
    <>
       {/* User section */}
    <div className='profile'>
      <div className="details">
        <div className="wrapper">
          
          {/* User Information */}
          <div className="title">
            <h1>User Infromation</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>Avatar :<img src={currentUser?.avatar || "./noAvatar.jpeg"} alt=""/></span>
            <span>Username:<b>{currentUser.username}</b></span>
            <span>E-mail:<b>{currentUser.email}</b></span>
            <button onClick={handleLogout}>Logout</button>
          </div>

          {/* User Listed section */}
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          { 
              loading ? (
              <div className="loadingIndicator">
                <ClipLoader size={200} color="black" />
              </div>
            ):(
              postData && postData.length>0 ?
             ( 
              // postData.map((item)=>(
                <List  item={postData}/>
              // ))
            ):(
              <article>Post not found 😥</article>
            )

            )}
       


          <div className="title">
            <h1>Saved List</h1>
          </div>
          { 
              loading ? (
              <div className="loadingIndicator">
                <ClipLoader size={200} color="black" />
              </div>
            ):(
              savePostData && savePostData.length>0 ?
             ( 
              // savePostData.map((item)=>(
                <List  item={savePostData}/>
              // ))
            ):(
              <article>You Don't have any Saved Posts 😥</article>
            )

            )}
          {/* <List/> */}

        </div>
      </div>

      {/* Chat section */}
      <div className="chatContainer">
        <div className="wrapper">
          <Chat chatData={dataFormLoader.chatResponse.data}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Profile
