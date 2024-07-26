import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'
import axios from 'axios'

const Indexpage = () => {
  const [places , setPlaces] = useState([])

  useEffect(()=>{
    axios.get('/places').then(response => {
      setPlaces(response.data)
    })
  } , [])

  return (
    <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
      {places.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id} key={place._id} className=''>
          {place.photos?.[0] && (
            <img className='rounded-2xl object-cover aspect-square' src={place.photos?.[0]} alt=""/>
          )}
          <h2 className='text-lg truncate'>{place.title}</h2>
          <h3 className='font-bold'>{place.address}</h3>
          <div className='mt-1'>
            <span className='font-bold'>${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  );
  
}

export default Indexpage

