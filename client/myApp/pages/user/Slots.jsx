import React, { useEffect, useState } from 'react'
import getSlots from '../../services/slot'
import SlotCard from '../../components/common/SlotCard'
import { useParams } from 'react-router-dom'
import "./styles.css"
const Slots = () => {
  const [slots,setSlots]=useState([])
  const {id}=useParams()
  async function getSlotsByService(){
    try{
       let data=await getSlots(id)
       setSlots(data.slots)
    }
    catch(error){
      console.log(error)
    }
    //  console.log(data)
  }

  useEffect(()=>{
      getSlotsByService()

  },[id])

  console.log("The slots",slots)
  let day=new Date()
  let date=day.getDate()
  let month=day.getMonth()
  let year=day.getFullYear()

  return (
    <div>
      <p>Hii</p>
     <div className='time-slot-container'>
      {slots.length>0  ?slots.map((item)=>{
      const formattedDate=new Date(item.date).toLocaleDateString("en-IN",{
        day:"2-digit",
        month:"2-digit",
        year:"numeric"
      })
      console.log(formattedDate)
      let SlotDate=formattedDate.slice(0,2)
      let slotMonth=formattedDate.slice(3,5)
      let slotYear=formattedDate.slice(6,10)
      console.log(SlotDate,slotMonth,slotYear)
      // const formattedStartTime=new Date(item.startTime).toLocaleTimeString("en-IN",{
      //   hour:"2-digit",
      //   minute:"2-digit",
      //   hour12:true
      // })
      // const formattedEndTime=new Date(item.endTime).toLocaleTimeString("en-IN",{
      //   hour:"2-digit",
      //   minute:"2-digit",
      //   hour12:true
      // })
       return(SlotDate>date && slotMonth>=month && slotYear>=year && <SlotCard serviceName={item.service.name} 
        date={formattedDate} 
        isActive={item.service.activeStatus} 
        startTime={item.startTime} 
        endTime={item.endTime}/>
       )
}):<p>No slots available for this service</p>}
     </div>
    </div>
  )
}

export default Slots
