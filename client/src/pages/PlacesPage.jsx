import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import AccountNav from '../AccountNav';
import axios from 'axios';

const PlacesPage = () => {
    const[places , setPlaces] = useState([])

    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
          setPlaces(data);
        });
      }, []);

    return (
        <div>
            <AccountNav />
            
                <div className='text-center'>
                    <Link className='bg-primary inline-flex gap-1 text-white py-2 px-4 rounded-full mt-8' to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>

                <div className='mt-4'>
                    {places.length > 0 && places.map(place => (
                        <Link to={'/account/places/' +place._id} className='flex cursor-pointer gap-4 bg-gray-200 p-4 rounded-2xl mb-8'>
                            <div className='w-32 h-32 bg-gray-300 grow shrink-0' >
                                {place.photos.length>0 && (
                                    <img className='w-full h-full object-cover' src={place.photos[0]} alt="" />
                                )}
                            </div>
                            <div className='grow-0 shrink -mt-2'>
                                <h2 className='text-xl'>{place.title}</h2>
                                <p className='text-sm mt-2'>{place.description}</p>
                            </div>
                            
                        </Link>
                    ))}
                    
                </div>
            
        </div>
    );
}

export default PlacesPage;
