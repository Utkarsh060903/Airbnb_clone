import './App.css'
import { Routes, Route } from 'react-router-dom'
import Indexpage from './pages/Indexpage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext' 
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import PlacePage from './pages/PlacePage'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './BookingPage'

axios.defaults.baseURL = 'https://byairbnb-o4ba.onrender.com'
axios.defaults.withCredentials = true

function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<Indexpage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/account' element={<ProfilePage />} />
                    <Route path='/account/places' element={<PlacesPage />}/>
                    <Route path='/account/places/new' element={<PlacesFormPage />}/>
                    <Route path='/account/places/:id' element={<PlacesFormPage />}/>
                    <Route path='/place/:id' element={<PlacePage />} />
                    <Route path='/account/bookings' element={<BookingsPage />}/>
                    <Route path='/account/bookings/:id' element={<BookingPage />}/>
                </Route>
            </Routes>
        </UserContextProvider>
    )
}

export default App
