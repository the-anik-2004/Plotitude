import React, { useContext, useReducer } from 'react';
import "./singlePage.scss";
import Slider from '../../components/slider/Slider';
import Map from '../../components/map/map';
import Feature from '../../components/feature/Feature';
import { useLoaderData, useNavigate } from 'react-router-dom';
import DOMpurify from "dompurify";
import { AuthContext } from "../../context/AuthContext.jsx";
import apiRequest from "../../lib/apiRequest.js";

const SinglePage = () => {
  const navigate = useNavigate();
  const post = useLoaderData();
  const { currentUser } = useContext(AuthContext);

  // Reducer for optimistic updates
  const [saved, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "TOGGLE":
        return !state;
      default:
        return state;
    }
  }, post.isSaved);

  //handle chat
  const handleChat = () => {
    if (!currentUser) {
      navigate("/login");  // Ensure user is logged in
      return;
    }
    navigate(`/profile`);  // Navigate to chat page with user ID
    
  };

  // Optimistic handleSave function
  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    // Optimistically toggle saved state
    dispatch({ type: "TOGGLE" });

    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (error) {
      console.log(error);
      // Revert state on error
      dispatch({ type: "TOGGLE" });
    }
  };

  
  return (
    <div className='singlePage'>
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className='address'>
                  <img src="./pin.png" alt="pin" />
                  <span>{post.address}</span>
                </div>
                <div className="price">₹ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar ? post.user.avatar : `noAvatar.jpeg`} alt={post.user.username} />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{
              __html: DOMpurify.sanitize(post.postDetail.desc)
            }}>
            </div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="wrapper">
          <p className='title'>General</p>
          <div className="listVertical">
            <Feature
              img="./utility.png"
              imgAlt="utility"
              title="Utilities"
              text={post.postDetail.utilites === "owner" ?
                "Owner is responsible" :
                (post.postDetail.utilites === "shared" ? "Responsibility is shared " : "Tenant is responsible")}
            />
            <Feature
              img={post.postDetail.pet === "allowed" ? "./pet.png" : "pet-Not-Allowed.png"}
              imgAlt="pet"
              title="Pet Policy"
              text={post.postDetail.pet === "allowed" ? "Pets are allowed" : "Pets are not allowed"}
            />
            <Feature
              img="./fee.png"
              imgAlt="Income Policy"
              title="Income Policy"
              text={post.postDetail.income}
            />
          </div>

          <p className='title'>Sizes</p>
          <div className="listHorizental">
            <Feature
              img="./size.png"
              imgAlt="size"
              title={`${post.postDetail.size} sqft`}
              featureStyle={{
                padding: '8px',
              }}
            />
            <Feature
              img="./bed.png"
              imgAlt="bed"
              title={`${post.bedroom} ${post.bedroom > 1 ? "Bedrooms" : "Bedroom"}`}
              featureStyle={{
                padding: '8px',
              }}
            />
            <Feature
              img="./bath.png"
              imgAlt="bath"
              title={`${post.bathroom} ${post.bathroom > 1 ? "Bathrooms" : "Bathroom"}`}
              featureStyle={{
                padding: '8px',
              }}
            />
          </div>

          <p className='title'>Nearby Places</p>
          <div className="listHorizental">
            <Feature
              img="./school.png"
              imgAlt="school"
              title="School"
              text={`${post.postDetail.school}` > 999 ? `${post.postDetail.school / 1000}km away` : `${post.postDetail.school}m away`}
              featureStyle={{
                padding: '8px',
              }}
            />
            <Feature
              img="./bus.png"
              imgAlt="busstop"
              title="Bus Stop"
              text={`${post.postDetail.bus}` > 999 ? `${post.postDetail.bus / 1000}km away` : `${post.postDetail.bus}m away`}
              featureStyle={{
                padding: '8px',
              }}
            />
            <Feature
              img="./restaurant.png"
              imgAlt="restaurant"
              title="Restaurant"
              text={`${post.postDetail.restaurant}` > 999 ? `${post.postDetail.restaurant / 1000}km away` : `${post.postDetail.restaurant}m away`}
              featureStyle={{
                padding: '8px',
              }}
            />
          </div>

          <p className='title'>Locations</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            {/* <button onClick={handleChat}>
              <img src="./chat.png" alt="chat" />
              <span>Send a Message</span>
            </button> */}
            <button onClick={handleSave} style={{
              backgroundColor: saved ? "lightgreen" : "white",
            }}>
              <img src="./save.png" alt="save" />
              <span>{saved ? "Place Saved✅" : "Save the Place"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
