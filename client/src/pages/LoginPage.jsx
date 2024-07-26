import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext'

const LoginPage = () => {

  const[email , setEmail] = useState('')
  const[password , setPassword] = useState('')
  const[redirect , setRedirect] = useState(false)
  const{setUser} = useContext(UserContext)

  const handleLogin = async(e)=>{
    e.preventDefault()
    try{
        const {data} = await axios.post('/login' , {email,password} , {withCredentials: true})
        setUser(data)
        alert('login successful')
        setRedirect(true)
    } catch(e){
        alert('login failed')
    }
  }

  if(redirect) {
    return<Navigate to={'/'} />
  }
  return (
    <div className='mt-32'>
        <div className='mt-4 grow flex items-center justify-around'>
        <div className='mb-32'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={handleLogin}>
            <input type="email" placeholder='your email' value={email} onChange={ev=>setEmail(ev.target.value)} />
            <input type="password" placeholder='password' value={password} onChange={ev=>setPassword(ev.target.value)} />
            <button className='primary'>Login</button>

            <div className='text-center py-2 text-gray-500'>Don't have an account yet ? 
                <Link className='underline text-black' to={'/register'}>Register now</Link>
            </div>
        </form>
        </div>
        
    </div>
    </div>
    
  )
}

export default LoginPage