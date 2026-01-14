import { useParams } from "react-router-dom"

async function getSlots(id){
   const token=localStorage.getItem("token")
   const response=await fetch(import.meta.env.VITE_BASE_URL+`/timeslot/${id}`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
   })
//    console.log(response)
   let data=await response.json()
   if(!response.ok){
      throw new error(data.message)
   }
   console.log(data)
   return data
}

export default getSlots