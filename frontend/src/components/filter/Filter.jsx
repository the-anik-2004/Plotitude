import React, { useState } from 'react'
import "./filter.scss"
import { useParams, useSearchParams } from 'react-router-dom'

const Filter = () => {
  const [searchParams,setSearchParams]=useSearchParams();
  const [query,setQuery]=useState(
    {
      type:searchParams.get("type")||"",
      property:searchParams.get("property")||"",
      minPrice:searchParams.get("minPrice")||0,
      maxPrice:searchParams.get("maxPrice")||10000000,
      city:searchParams.get("city")||"",
      bedroom:searchParams.get("bedroom")||1,
    }
  )

  const handleChange=e=>{
    setQuery({
      ...query,
      [e.target.name]:e.target.value
    })
  }

  const handleFilter=()=>{
    setSearchParams(query);
  }

  
  
  
  return (
    <div className='filter'>
      {searchParams.get("city")?
      (
        <h1>Seach Results for <b>{searchParams.get("city").charAt(0).toUpperCase()+searchParams.get("city").substring(1)}</b></h1>
        ):(
          <h1>Here is the list of Plots</h1>
        )
        }<div className="top">
            <label htmlFor="city">Location</label>
            <input type="text" id="city" name="city" placeholder='City Location' onChange={handleChange} defaultValue={query.city}/>
        </div>
        <div className="bottom">
            <div className="resTop">
                <div className="item">
                        <label htmlFor="type">Type</label>
                        <select name="type" id="type" onChange={handleChange} defaultValue={query.type}>
                            <option value="" >any</option>
                            <option value="buy" >Buy</option>
                            <option value="rent">Rent</option>
                        </select>
                </div>

                <div className="item">
                    <label htmlFor="property">Property</label>
                    <select name="property" id="property" onChange={handleChange} defaultValue={query.property}>
                        <option value="" >any</option>
                        <option value="apartment" >Apartment</option>
                        <option value="house">House</option>
                        <option value="condo">Condo</option>
                        <option value="land">Land</option>   
                    </select>
                </div>

                <div className="item">
                    <label htmlFor="minPrice">Min Price</label>
                    <input min={0} type="number" id="minPrice" name="minPrice" placeholder='any' onChange={handleChange} defaultValue={query.minPrice}/>
                </div>
                </div>

                <div className='resBottom'>
                <div className="item">
                    <label htmlFor="maxPrice">Max Price</label>
                    <input min={0} type="number" id="maxPrice" name="maxPrice" placeholder='any' onChange={handleChange} defaultValue={query.maxPrice}/>
                </div>

                <div className="item">
                    <label htmlFor="bedroom">Bedroom</label>
                    <input min={0} type="number" id="bedroom" name="bedroom" placeholder='any' onChange={handleChange} defaultValue={query.bedroom}/>
              </div>

                <button onClick={handleFilter}><img src="./search.png" alt="Search" /></button>
                
              </div>
        </div>
    </div>
  )
}

export default Filter;
