import React, { useContext } from 'react'
import './homepage.scss';
import SearchBar from '../../components/searchBar/SearchBar';
import { AuthContext } from '../../context/AuthContext.jsx';

const HomePage = () => {
  const {currentUser}=useContext(AuthContext);

  return (
    <div className='hompage'>
      <div className="textContainer">
        <div className="wrapper">
            <h1 className='title'>
                Find your dream Plots & Real Estate  
            </h1>
            <p>
            Welcome to Plotitude – your trusted real estate companion. Discover dream properties, explore curated listings, and experience seamless property solutions tailored to your needs.
            </p>
            <SearchBar/>
            <div className="boxes">
              <div className="box">
                <h1>16+</h1>
                <h2>Years of Experience</h2>
              </div>

              <div className="box">
                <h1>200</h1>
                <h2>Award Gained</h2>
              </div>

              <div className="box">
                <h1>1200+</h1>
                <h2>Property Ready</h2>
              </div>
            </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="background Image" />
      </div>
    </div>
  )
}

export default HomePage;
