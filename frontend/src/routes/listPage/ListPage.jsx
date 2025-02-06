import React, { useEffect, useState } from 'react';
import "./listPage.scss";
import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card';
import Map from '../../components/map/map';
import { useLoaderData } from 'react-router-dom';
import { ClipLoader} from 'react-spinners' ;

const ListPage = () => {
  const [loading, setLoading] = useState(true);
  const [data,setData]=useState(null);
  const dataFormLoader=useLoaderData();

  useEffect(()=>{
    setLoading(true);
      setTimeout( () => { setData(dataFormLoader);
      setLoading(false);},500)
     
  },[dataFormLoader])
  // console.log(data)
  return (
    <div className='listPage'>

      <div div className="listContainer">
        <div className="wrapper">
            <Filter/>
            { 
              loading ? (
              <div className="loadingIndicator">
                <ClipLoader size={200} color="black" />
              </div>
            ):(
              data && data.length>0 ?
             ( 
              data.map((item)=>(
                <Card key={item.id} item={item}/>
              ))
            ):(
              <article>Post not found 😥</article>
            )

            )}      
        </div>
      </div>

      <div className="mapContainer">
      {loading ? (
        <div className="loadingIndicator">
          <ClipLoader size={200} color="black" />
        </div>
      ):(
        data && data.length>0?
        (<Map items={data}/>):
        (<article>Map locations not found 🌍</article>)
      )}
                
      </div>

  
    </div>
  )
}

export default ListPage;
