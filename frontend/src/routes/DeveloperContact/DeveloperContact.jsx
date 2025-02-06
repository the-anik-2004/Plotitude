import React from "react";

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./DeveloperContact.scss";
import {Link} from "react-router-dom";

const DeveloperContact = () => {
  return (
    <div className="developer-contact">
      <video autoPlay loop muted playsInline className="background-video">
            <source src="/pgVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
      <div className="profile-photo">
        <img src="/2.jpg" alt="Anik Pal" />
      </div>

      {/* Bio and Social Links */}
      <div className="contact-info">
        <h2>Anik Pal</h2>
        <p>Full-Stack Developer | MERN Stack | Freelancer</p>

        <div className="social-links">
          <div>
            <Link to="https://www.instagram.com/anikpal_/" target='_blank'><img src="/instagram.png"/></Link>
            <Link to="https://www.facebook.com/profile.php?id=100085955671264" target='_blank'><img src="/facebook.png"/></Link>
            <Link to="https://discordapp.com/users/1281487457958891605" target='_blank'><img src="/dicord.png"/></Link>
          </div>
          <div>
          <Link to="https://github.com/the-anik-2004"target='_blank'><img src="/github.png" /></Link>
          <Link to="https://www.linkedin.com/in/the-anik-pal/"target='_blank'><img src="/linkedIn.png" /></Link>
          <Link to="https://x.com/anikpal_?t=7LjD7Cimo8GY5xOKuSQ_cQ&s=08" target='_blank'><img src="/x.png"/></Link>
       
          </div>
        
         </div>
        

        <p>Email: <a className="social" href="mailto:anikpal.professional@gmail.com">anikpal.professional@gmail.com</a></p>
      </div>
    </div>
  );
};

export default DeveloperContact;
