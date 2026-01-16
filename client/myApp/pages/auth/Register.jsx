import React from 'react'
import "./register.css"
import NavBar from '../../components/common/NavBar'
import { Link } from 'react-router-dom'
const Register = () => {
  return (
    <div >
      <NavBar/>
      <div className='register-container'>
      <form className='form-container'>
        <h1 className='register-heading'>Create Account</h1>
        <p className='register-sub-heading'>Please sign up to book appointment</p>
        <label htmlFor="full-name">Full Name</label>
        <input type="text" id='full-name' />
        <label htmlFor="email">Email</label>
        <input type="email" id='email' />
        <label htmlFor="password">Password</label>
        <input type="password" id='password' />
        <button className='register-button'>Create account</button>
        <p className='already-have-an-account'>Already have an account? <Link className='already-have-an-account-button'>Login here</Link></p>
      </form>
      </div>
    </div>
  )
}

export default Register
