import React,{useState} from 'react'
import "./slider.scss"

const Slider = ({images}) => {
  const [imageIndex,setImageIndex]=useState(null);

  const changeSlide=(direction)=>{
      if(direction==="left"){
        if(imageIndex===0){
          setImageIndex(0);
        }else{
          setImageIndex(imageIndex-1);
        }
      }else{
        if(imageIndex===images.length-1){
          setImageIndex(images.length-1);
        }else{
          setImageIndex(imageIndex+1);
        }
      }
  }
  return (
    <div className='slider'>

      {
      imageIndex!==null && 
      <div className="fullSlider">
         <div className='arrow'>
         {imageIndex!==0 &&
          <img src="./arrow.png" alt="arrow" onClick={()=>changeSlide("left")}/>
         }
        </div>

        <div className='imgContainer'>
            <img src={images[imageIndex]} alt="image" />
        </div>

       <div className='arrow'>
        {imageIndex!==(images.length-1) && 
          <img className='right' src="./arrow.png" alt="arrow" onClick={()=>changeSlide("right")} />
          }
        </div>
        <div className="close" onClick={()=>setImageIndex(null)}>X</div>
      </div>
      }

      <div className="mainImage" ><img src={images[0]?images[0]:`placeholder_with_logo.png`} alt="main" onClick={()=>setImageIndex(0)}  /></div>
      <div className="smallImages">
        {
          images.slice(1).map((image,index)=>(
            <img onClick={()=>setImageIndex(index+1)} src={image} alt={index} key={index}/>
          ))
        }
      </div>
    </div>
  )
}

export default Slider;
