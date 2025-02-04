import React, { useState } from 'react'
import "./searchBar.scss"
import { Link } from 'react-router-dom'

const SearchBar = () => {
    const [query,setQuery]=useState({
        type:"buy",
        location:"",
        minPrice:0,
        maxPrice:0
    })
    const types=["buy","rent"];

    const switchType=(val)=>{
        setQuery((prev)=>(
            {
                ...prev,
                type:val,
            }
        ));
    }
    const handleChange=(e)=>{
        const value = e.target.name === 'city' ? e.target.value.toLowerCase() : e.target.value;
        setQuery((prev)=>({
            ...prev,
            [e.target.name]: value
        }))
    }


  return (
    <div className='searchBar'>
        <div className="type">
            {
                types.map((type)=>{
                   return <button 
                    key={type}
                    onClick={()=>switchType(type)}
                    className={query.type===type?"active":""}
                   >{type}</button>;
                })
            }
        </div>
        <form action="">
            <input type="text" name="city" placeholder='Enter Location' onChange={handleChange}/>
            <input type="number" min={0} max={10000000} name="minPrice" placeholder='Min Price' onChange={handleChange}/>
            <input type="number" min={0} max={10000000} name="maxPrice" placeholder='Max Price' onChange={handleChange}/>
           
           <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${parseInt(query.minPrice)}&maxPrice=${parseInt(query.maxPrice)}`} >
            <button type="submit" className='submit-btn'>
            <img src='/search.png'/>
            </button>       
           </Link>
        </form>
    </div>
  )
}

export default SearchBar;
