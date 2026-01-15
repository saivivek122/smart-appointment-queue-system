
async function handleBookingConfirmation(serviceId,slotId){
    console.log("from",serviceId,slotId)
    const token=localStorage.getItem("token")
    let obj={
        serviceId:serviceId,
        slotId:slotId
    }
    console.log(obj)
    const response=await fetch(import.meta.env.VITE_BASE_URL+"/appointment",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(obj)
    })
    console.log(await response.json())   
}

export default handleBookingConfirmation