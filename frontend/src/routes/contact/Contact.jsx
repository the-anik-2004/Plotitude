import React from 'react'
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { useLoaderData } from 'react-router-dom';
import "./contact.scss"


const Contact = () => {
    const contacts=useLoaderData();
    console.log(contacts)
  return (
    <>
   

    <div className='contact'>
    <video autoPlay loop muted playsInline className="background-video">
            <source src="/bgVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
      {  contacts.map((contact)=>(
                  <ProfileCard
                  username={contact.username}
                  avatar={contact.avatar||'noAvatar.jpeg'}
                  email={contact.email}
                  createdAt={contact.createdAt}
                />
        ))
      }
  
  
  </div>
  </>
  )
}

export default Contact
