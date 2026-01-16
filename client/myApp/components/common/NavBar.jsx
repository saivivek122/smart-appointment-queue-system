import React from 'react'
import logo from "../../src/assets/logo.svg";
import "./styles.css"
import { Link, useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate=useNavigate()
  function handleNavigate(){
      navigate("/register")
  }

  return (
    <div>
      <nav className="nav-bar">
        <div className="nav-logo-container">
          <img className="nav-logo" src={logo} alt="" />
        </div>
        <div className="nav-items">
          <Link className="nav-item" to="/">Home</Link>
          <Link className="nav-item">All Services</Link>
          <Link className="nav-item">About</Link>
          <Link className="nav-item">Contact</Link>
        </div>
        <div className="nav-button">
          <button className="create-account-button" onClick={handleNavigate}>Create account</button>
        </div>
      </nav>
      <div className="nav-line-container">
        <div className="nav-line"></div>
      </div>
    </div>
  )
}

export default NavBar
