import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import AccountNav from '../AccountNav'

const ProfilePage = () => {
  const {ready,user, setUser} = useContext(UserContext)
  const[redirect , setRedirect] = useState(null)
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }
  
  if(!ready) {
    return 'Loading...'
  }

  if(ready && !user && !redirect){
    return <Navigate to={'/login'} />
  }

  if(redirect){
    return <Navigate to={redirect} />
  }

  
  return (
    <div>
      <AccountNav/>
      {subpage ==='profile' &&  (
       <div className='text-center max-w-lg mx-auto mt-8'>
        Logged in as {user.name} ({user.email}) <br />
        <button className='primary max-w-sm mt-2' onClick={logout}>Logout</button>
       </div>
      )}
      {subpage==='places' && (
        <PlacesPage />
      )}
    </div>
  )
}

export default ProfilePage