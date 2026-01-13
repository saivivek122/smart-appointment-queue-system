import { createContext, useEffect, useState } from "react"

const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const [isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem("token")?true:false)
    const [user,setUser]=useState({
        name:"",
        role:"",
        userId:""
    })
    useEffect(()=>{
     let token= localStorage.getItem("token")
     if(token){
        setIsLoggedIn(true)
     }
     else{
        setIsLoggedIn(false)
     }
    },[])
    function login(token,user){
        localStorage.setItem("token",token)
        setIsLoggedIn(true)
        setUser({...user,name:user.name,role:user.role,userId:user.id})
        console.log("the role is",user)

    }
    function logout(){
        localStorage.removeItem("token")
        setIsLoggedIn(false)
    }
    return(
        <AuthContext.Provider value={{isLoggedIn,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext