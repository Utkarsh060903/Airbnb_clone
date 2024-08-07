import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const registerUser = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post('/register', {
            name,
            email,
            password
        })
        alert('Registration successful')
    } catch (e) {
        alert('Registration failed')
    }
  }

  return (
    <div className='mt-32'>
      <div className='mt-4 grow flex items-center justify-around'>
        <div className='mb-32'>
          <h1 className='text-4xl text-center mb-4'>Register</h1>
          <form className='max-w-md mx-auto' onSubmit={registerUser}>
            <input type="text" placeholder='your name' value={name} onChange={ev => setName(ev.target.value)} />
            <input type="email" placeholder='your email' value={email} onChange={ev => setEmail(ev.target.value)} />
            <input type="password" placeholder='password' value={password} onChange={ev => setPassword(ev.target.value)} />
            <button className='primary'>Register</button>

            <div className='text-center py-2 text-gray-500'>
              <Link className='underline text-black' to={'/login'}>Login now</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
