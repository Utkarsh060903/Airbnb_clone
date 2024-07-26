import React, { useState } from 'react'
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const BookingWidget = ({place}) => {
    const [checkIn,setCheckIn] = useState('')
    const [checkOut , setCheckOut] = useState('')
    const [numberOfGuests , setNumberOfGuests] = useState(1)
    const[name , setName] = useState('')
    const[phone , setPhone] = useState('') 
    const[redirect , setRedirect] = useState('')

    let numberOfNights = 0;
    if(checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut) , new Date(checkIn))
    }

    async function bookThisPlace() {
        const response = await axios.post('/bookings', {
          checkIn,checkOut,numberOfGuests,name,phone,
          place:place._id,
          price:numberOfNights * place.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
      }
    

    // async function bookThisPlace() {
    //     try {
    //         const response = await axios.post('http://localhost:4000/bookings', {
    //             checkIn, checkOut, numberOfGuests, name, phone,
    //             place: place._id,
    //             price: numberOfNights * place.price
    //         });
    //         const bookingId = response.data._id;
    //         setRedirect(`/account/bookings/${bookingId}`);
    //     } catch (error) {
    //         console.error('There was an error booking the place!', error);
    //     }
    // }

    if(redirect){
        return <Navigate to={redirect} />
    }

  return (
    <div className='bg-white rounded-2xl p-4 shadow'>
                    <div className='text-2xl text-center'>
                         price: ${place.price} / per night
                    </div>
                    <div className="border rounded-2xl mt-4">
                        <div className='flex'>
                        <div className=' py-3 px-4'>
                        <label>check in date :</label>
                        <input type="date" value={checkIn} onChange={(ev)=>setCheckIn(ev.target.value)} />
                        </div>
                        <div className=' py-3 px-4 border-l'>
                        <label className=''>check out date:</label>
                        <input type="date" value={checkOut} onChange={(ev)=>setCheckOut(ev.target.value)} />
                        </div>
                    </div>
                    <div className=' py-3 px-4 border-t'>
                        <label className=''>Number of guests:</label>
                        <input type="Number" value={numberOfGuests} onChange={(ev)=>setNumberOfGuests(ev.target.value)} />
                    </div>
                    
                    {numberOfNights>0 && (
                        <div className=' py-3 px-4 border-t'>
                            <label className=''>full name:</label>
                            <input type="text" value={name} onChange={(ev)=>setName(ev.target.value)} />
                            <label className=''>mobile number:</label>
                            <input type="tel" value={phone} onChange={(ev)=>setPhone(ev.target.value)} />
                        </div>

                    )}
                    
                   
                    <button onClick={bookThisPlace} className='primary mt-4'>Book this place
                       {numberOfNights>0 && (
                        <>
                            <span>${numberOfNights * place.price}</span>
                        </>
                       )}
                    </button>
                </div>
                </div>
  )
}

export default BookingWidget