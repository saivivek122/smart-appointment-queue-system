import React, { Children, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {isLoggedIn}=useContext(AuthContext)
    console.log(isLoggedIn)
    if(!isLoggedIn){
        return <Navigate to="/"/>
    }
   return children
}

export default ProtectedRoute
