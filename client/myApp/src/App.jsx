import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from '../pages/auth/Login'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/auth/Register'
import Home from '../pages/user/Home'
import ProtectedRoute from '../routes/ProtectedRoute'
import Dashboard from '../pages/user/Dashboard'
import Services from '../pages/user/Services'
import Slots from '../pages/user/Slots'
import BookingConfirmation from '../pages/user/BookingConfirmation'

function App() {
   return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/timeSlot/:id' element={<Slots/>}/>
        <Route path='/appointment' element={<BookingConfirmation/>}/>
      </Routes>
    </div>
  )
}

export default App
