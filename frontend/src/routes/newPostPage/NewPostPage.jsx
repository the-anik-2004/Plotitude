import React, { useState } from 'react';
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from '../../lib/apiRequest.js';
import UploadWidget from '../../components/uploadWidget/UploadWidget.jsx';
import { useNavigate } from 'react-router-dom';

const NewPostPage = () => {
    const [value,setValue]=useState("");
    const[images,setImages]=useState([]);
    const [error,setError]=useState("");
    const [btn,setBtn]=useState(false);
    const navigate=useNavigate();


    const handleSubmit=async(e)=>{
        e.preventDefault();
        setBtn(true);
        const formData=new FormData(e.target);
        const inputs=Object.fromEntries(formData);
      
        try {
            const res = await apiRequest.post("/posts", {
                postData: {
                    title: inputs.title,
                    price: parseInt(inputs.price),
                    address: inputs.address,
                    city: inputs.city,
                    bedroom: parseInt(inputs.bedroom),
                    bathroom: parseInt(inputs.bathroom),
                    type: inputs.type.toLowerCase(),
                    property: inputs.property.toLowerCase(),
                    latitude: inputs.latitude,
                    longitude: inputs.longitude,
                    images: images || [],
                },
                postDetail: {
                    desc: value || "No description provided", // Add ReactQuill value here
                    utilites: inputs.utilities,
                    pet: inputs.pet,
                    income: inputs.income,
                    size: parseInt(inputs.size),
                    school: parseInt(inputs.school),
                    bus: parseInt(inputs.bus),
                    restaurant: parseInt(inputs.restaurant),
                }
            
            });
            
              navigate(`/${res.data.id}`);
             
              e.target.reset(); // Resets all form fields
              setValue(""); // Resets ReactQuill value
             setImages([]);
        } catch (err) {
          setBtn(false)
            setError(err.response?.data?.message || err.message || "An unknown error occurred.");
        }
        console.log(inputs);
 
        console.log("Description Value: ", value);
        console.log("all images",images)
    }

    return (
        <div className="newPostPage">
          <div className="formContainer">
            <h1>Add New Post</h1>
            <div className="wrapper">
              <form onSubmit={handleSubmit}>
                <div className="item">
                  <label htmlFor="title">Title</label>
                  <input id="title" name="title" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="price">Price</label>
                  <input id="price" name="price" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="address">Address</label>
                  <input id="address" name="address" type="text" />
                </div>

                <div className="item description">
                  <label htmlFor="desc">Description</label>
                 <ReactQuill theme="snow" value={value} onChange={setValue} />
                </div>

                <div className="item">
                  <label htmlFor="city">City</label>
                  <input id="city" name="city" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="bedroom">Bedroom Number</label>
                  <input min={1} id="bedroom" name="bedroom" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="bathroom">Bathroom Number</label>
                  <input min={1} id="bathroom" name="bathroom" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="latitude">Latitude</label>
                  <input id="latitude" name="latitude" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="longitude">Longitude</label>
                  <input id="longitude" name="longitude" type="text" />
                </div>
                <div className="item">
                  <label htmlFor="type">Type</label>
                  <select name="type">
                    <option value="rent" defaultChecked>
                      Rent
                    </option>
                    <option value="buy">Buy</option>
                  </select>
                </div>
                <div className="item">
                  <label htmlFor="type">Property</label>
                  <select name="property">
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="land">Land</option>
                  </select>
                </div>
    
                <div className="item">
                  <label htmlFor="utilities">Utilities Policy</label>
                  <select name="utilities">
                    <option value="owner">Owner is responsible</option>
                    <option value="tenant">Tenant is responsible</option>
                    <option value="shared">Shared</option>
                  </select>
                </div>
                <div className="item">
                  <label htmlFor="pet">Pet Policy</label>
                  <select name="pet">
                    <option value="allowed">Allowed</option>
                    <option value="not-allowed">Not Allowed</option>
                  </select>
                </div>
                <div className="item">
                  <label htmlFor="income">Income Policy</label>
                  <input
                    id="income"
                    name="income"
                    type="text"
                    placeholder="Income Policy"
                  />
                </div>
                <div className="item">
                  <label htmlFor="size">Total Size (sqft)</label>
                  <input min={0} id="size" name="size" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="school">School</label>
                  <input min={0} id="school" name="school" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="bus">bus</label>
                  <input min={0} id="bus" name="bus" type="number" />
                </div>
                <div className="item">
                  <label htmlFor="restaurant">Restaurant</label>
                  <input min={0} id="restaurant" name="restaurant" type="number" />
                </div>
                <button disabled={btn} className="sendButton" type="submit">
                      {btn ? (
                        <>
                          Submitting... <span className="loader"></span>
                        </>
                      ) : (
                        "Add"
                      )}
                </button>
                {error && <span>{error.message || JSON.stringify(error)}</span>}
              </form>
            </div>
          </div>
          <div className="sideContainer">
          {images.length!=0 && <div className="imgContainer">
           {
                images.map((img,ind)=>(
                    <img src={img} key={ind}/>
                ))
            }
           </div>}
            <UploadWidget 
                uwConfig={{
                    multiple:true,
                    cloudName:"dw3lymnm7",
                    uploadPreset:"plotitude",
                    floder:"posts"
                }}
                setState={setImages}
                />
          </div>
        </div>
      );
}

export default NewPostPage;
