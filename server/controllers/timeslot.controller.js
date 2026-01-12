const Service = require("../models/Service.model");
const TimeSlot = require("../models/Timeslot.model");


const createTimeSlot=async(req,res)=>{
    try{
        // const {serviceId}=req.params;
        const {date,startTime,endTime,serviceId,activeStatus}=req.body
        console.log(serviceId,startTime,endTime)
       
        if(!serviceId ||!date || !startTime || !endTime){
            return res.status(400).send({
                message:"All fields are required"
            })
        }
        const service=await Service.findById(serviceId)
        if(!service){
            return res.status(404).send({
                message:"Service Not Found"
            })
        }
        if(!service.activeStatus){
            return res.status(400).send({
                message:"Service Inactive Cannot Book Time Slots"
            })
        }
        const overlappingSlot=await TimeSlot.findOne({
            service:serviceId,
            date,
            startTime:{$lt:endTime},
            endTime:{$gt:startTime}
        })
        if(overlappingSlot){
            return res.status(409).send({
                message:"Time Slots overlaps with existing slot"
            })
        }
        const slot=await TimeSlot.create({
            service:serviceId,
            date,
           startTime,
           endTime,
           activeStatus
        })
        res.status(201).send({
            message:"New Time Slot created for the service",
            slot
        })
    }
    catch(error){
        return res.status(500).send(error.message)
    }
}
const getSlotsByService=async(req,res)=>{
    try{
        const {serviceId}=req.params
        console.log(serviceId)
        const slots=await TimeSlot.find({service:serviceId}).populate("service")
        if(slots.length==0){
            return res.status(404).send("No Slots Available For This Service")
        }
        res.status(200).send({
            message:"Time Slots Available For This Service",
            slots
        })
    }
    catch(error){
        res.status(500).send(error.message)
    }
}
const activeSlotsByService=async(req,res)=>{
    try{
        const {serviceId}=req.params
        const slots=await TimeSlot.find({service:serviceId,activeStatus:true})
        if(slots.length===0){
            return res.status(404).send({
                message:"No Active Time Slots Found For This Service"
            })
        }
        return res.status(200).send({
            message:"Active Slots For This Service",
            slots
        })
    }
    catch(error){
        res.status(500).send(error.message)
    }
}
const toggleSlotStatus=async(req,res)=>{
    try{
        const {slotId}=req.params;
        console.log(slotId)
        const slot=await TimeSlot.findById({_id:slotId})
        console.log(slot)
        if(!slot){
            return res.status(404).send({
                message:"Slot not found"
            })
        }
        slot.activeStatus=!slot.activeStatus
        await slot.save()
        res.status(200).send({
            message:"Slot Status Updated",
            slot
        })
    }
    catch(error){
        res.status(500).send(error.message)
    }
}
module.exports={createTimeSlot,getSlotsByService,activeSlotsByService,toggleSlotStatus}