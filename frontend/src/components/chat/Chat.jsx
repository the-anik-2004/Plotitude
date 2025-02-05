import React, { useContext, useEffect, useRef, useState } from 'react'
import "./chat.scss"
import Message from '../../components/message/Message';
import { ClipLoader } from 'react-spinners';
import {AuthContext} from "../../context/AuthContext.jsx"
import apiRequest from '../../lib/apiRequest.js';
import {format} from "timeago.js";
import { SocketContext } from '../../context/SocketContext.jsx';
import { useNotificationStore } from '../../lib/notificationStore.js';

const Chat = ({chatData}) => {

  const {currentUser}=useContext(AuthContext);
  const {socket}=useContext(SocketContext)
  const [chat,setChat]=useState(null);

 const messageEndRef=useRef();
 const decrease=useNotificationStore(state=>state.decrease);

 useEffect(()=>{
  messageEndRef.current?.scrollIntoView({behavior:"smooth"})
 },[chat]);

 const handleOpenChat = async (id, receiver) => {
  try {
    const res = await apiRequest("/chats/" + id);
    if (!res.data.seenBy.includes(currentUser.id)) {
      decrease();
    }
    setChat({ ...res.data, receiver });
  } catch (err) {
    console.log(err);
  }
};

  const handleMessageSubmit=async(e)=>{
    e.preventDefault();

    const formData=new FormData(e.target);
    const text=formData.get("text");

    if(!text) return;

    try {
      const res=await apiRequest.post("/messages/"+chat.id,{text});
      setChat((prev)=>({...prev,messages:[...prev.messages,res.data]})) ;
      e.target.reset(); 
      socket.emit("sendMessage",{
        receiverId:chat.receiver.id,
        data:res.data,
      })    
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{

    const read =async()=>{
      try {
        await apiRequest.put("/chats/read"+chat.id);
      } catch (error) {
        console.log(error)
      }
    }
    if(chat && socket){
      socket.on("getMessage",(data)=>{
        if(chat.id===data.chatId){
          setChat(prev=>({
            ...prev,
            messages:[...prev.messages,data],
          }));
          read();
        }
      })
    }
    return () => {
      socket.off("getMessage");
    };
  },[socket,chat])
  // console.log(chat)

  return (
    <div className="chat">
     
       <h1>Messages</h1>
        <div className="messages">
          {
              chatData && chatData.length>0 ? 
              (
                chatData.map((chatItem)=>(
                  <Message 
                  key={chatItem.id}
                  dp={chatItem.receiver.avatar||`noAvatar.jpeg`}
                  username={chatItem.receiver.username}
                  sms={chatItem.lastMessage||"Start conversation🏡"}
                  style={{
                    backgroundColor:chatItem.seenBy.includes(currentUser.id)||chat?.id===chatItem.id ?"white":"yellow"
                  }}
                  onClick={()=>handleOpenChat(chatItem.id,chatItem.receiver)}
                  />
                ))
              )
                :(
                  <article>No Chat Found 😥</article>
                )
              }
           
        
      
        </div>
       {
        
       chat && 
       (<div className="chatBox">

           <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar} alt={chat.receiver.username} />
              {chat.receiver.username}
            </div>
            <span className='close' onClick={()=>setChat(null)}>❌</span>
           </div>

           <div className="center">
              {
                chat.messages.map(msg=>(
                  <div className="chatMessage"
                  style={{
                    alignSelf:msg.userId===currentUser.id?"flex-end":"flex-start",
                    textAlign:msg.userId===currentUser.id?"right":"left",
                    backgroundColor:msg.userId===currentUser.id?"rgb(4, 128, 35)":""
                  }}
                  key={msg.id} >
                    <p>{msg.text}</p>
                    <span>{format(msg.createdAt)}</span>
                  </div> 
                ))
              }
              <div ref={messageEndRef}></div>

          
              
           </div>
           <form onSubmit={handleMessageSubmit} className="bottom">
                <textarea name="text" placeholder="Type your message here..."></textarea>
                <button type='submit'>SEND</button>
           </form>
        </div>)}
    </div>
  )
}

export default Chat;
