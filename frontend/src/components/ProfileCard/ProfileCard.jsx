import React from "react";
import "./ProfileCard.scss";

const ProfileCard = ({ username, avatar, email, createdAt }) => {
    const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short", // "Jan", "Feb", etc.
        year: "numeric",
      });
  return (
    <div className="profile-card">
      <div className="avatar">
        <img src={avatar} alt={`${username}'s avatar`} />
      </div>
      <div className="info">
        <h3>{username}</h3>
        <a href={`mailto:${email}`}>{email}</a>
        <span>Joined: {formattedDate}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
