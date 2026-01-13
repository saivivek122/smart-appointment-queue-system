import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

const Home = () => {
  const {logout}=useContext(AuthContext)
  return (
    <div>
      <p>Home</p>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  )
}

export default Home
