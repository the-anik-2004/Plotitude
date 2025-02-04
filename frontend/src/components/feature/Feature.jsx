import React from 'react'
import './feature.scss'
const Feature = ({img,imgAlt,title,text,featureStyle, textStyle, imgStyle}) => {
  return (
        <div className="feature" style={featureStyle}>
            <img src={`${img}`} alt={imgAlt} style={imgStyle} />
            <div className='featureText' style={textStyle}>
                <span>{title}</span>
                <p>{text}</p>
            </div>
        </div>
  )
}

export default Feature;
