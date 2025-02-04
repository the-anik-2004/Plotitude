import React from 'react'
import "./map.scss";
import { MapContainer,TileLayer,Marker,Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Pin from '../pin/Pin';

const Map = ({items,zoom=false}) => {
  console.log(items);
  
  return (
    <MapContainer className="map" center={items.length!==0?[items[0].latitude,items[0].longitude]:[22.84,85.57]} zoom={5} scrollWheelZoom={zoom}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> <img className="logo" src="./logo.png"/>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {
      items.map((item)=>(
        <Pin key={item.id} item={item}/>
      ))
    }
    
  </MapContainer>
  )
}

export default Map;
