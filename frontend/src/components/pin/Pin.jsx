import React from 'react';
import "./pin.scss";
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

const Pin = ({item}) => {
 console.log(item)
  return (
    <div className='pin'>
      <Marker position={[item.latitude,item.longitude]}>
      <Popup>
        <div className="popUpContainer">
            <img src={item.images[0]} alt={item.title} />
        
           <div className="textContainer">
            <Link to={`/${item?.id}`}>{item?.title}</Link>
            <span className='bed'>{item?.bedroom} Bedroom</span>
            <b>₹ {item?.price}</b>
            </div>
        </div>
      </Popup>
    </Marker>
    </div>
  )
}

export default Pin;
