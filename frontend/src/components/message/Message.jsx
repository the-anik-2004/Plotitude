import React from 'react'
import "./message.scss"

const Message = ({dp,username,sms,onClick,style}) => {
  return (
    <div className="message" onClick={onClick}
    style={style}
    >
      <img src={dp} alt="" />
      <div className='text'>
      <span>{username}</span>
      <p>{sms.slice(0,30).concat("...")}</p>
      </div>
        
    </div>
  )
}

export default Message
