const Appointment = require("../models/Appointment.model");
const Service = require("../models/Service.model");
const TimeSlot = require("../models/Timeslot.model");

const bookAppointment=async(req,res)=>{
    try{
        const userId=req.userId
        const {serviceId,slotId}=req.body;
        if(!serviceId || !slotId){
            return res.status(400).send({
                message:"Both serviceId and SlotId are required"
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
                message:"Service Is InActive"
            })
        }

       const slot=await TimeSlot.findById(slotId)
       if(!slot){
        return res.status(404).send({
            message:"Slot Not Found"
        })
       }
       if(!slot.activeStatus){
        return res.status(400).send({
            message:"Slot InActive"
        })
       }
       if(slot.service.toString()!==serviceId){
        console.log(slot.service.toString()==serviceId)
        return res.status(400).send({
            message :"Slot does not belong to the service"
        })
       }
       const now=new Date()
       now.setHours(0,0,0,0)
       const slotDate=new Date(slot.date)
       slotDate.setHours(0,0,0,0)
       if(slotDate<now){
        console.log(slotDate,now)
        return res.status(400).json({
            message:"Cannot Book Past Slots"
        })
       }

       const existingAppointment=await Appointment.findOne({
        user:userId,
        service:serviceId,
        slot:slotId
       })
       if(existingAppointment){
         return res.status(409).send({
            message :"You Already Booked This Slot"
         })
       }
       const queueCount=await Appointment.countDocuments({
        slot:slotId,
        status:{$ne:"cancelled"}
       })
       const queuePosition=queueCount+1
       const appointment=await Appointment.create({
        user:userId,
        service:serviceId,
        slot:slotId,
        queuePosition,
        status:"booked"
       })
       return res.status(201).send({
        message:"Appointment Booked Successfully",
        appointmentId:appointment._id,
        queuePosition,
        status:appointment.status,
        slot:{
            date:slot.date,
            startTime:slot.startTime,
            endTime:slot.endTime
        }
       })
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

const getQueueStatus=async(req,res)=>{
    try{
        const userId=req.userId
        console.log(userId)
        const {appointmentId}=req.params
        console.log(appointmentId)
        const appointment=await Appointment.findOne({
            _id:appointmentId,
            user:userId,
        }).populate("slot","date startTime endTime")
        if(!appointment){
            return res.status(404).send({
                message:"Appointment Not Found"
            })
        }
        if(["completed","canceled"].includes(appointment.status)){
            return res.status(200).send({
                status:appointment.status,
                message:`Appointment is ${appointment.status}`
            })
        }
        const peopleAhead=await Appointment.countDocuments({
            slot:appointment.slot,
            status:{$ne:"cancelled"},
            queuePosition:{$lt:appointment.queuePosition}
        })

        const totalInQueue=await Appointment.countDocuments({
            slot:appointment.slot,
            status:{$ne:"cancelled"}
        })
        return res.status(200).send({
            appointmentId:appointment._id,
            status:appointment.status,
            yourQueuePosition:appointment.queuePosition,
            peopleAhead,
            totalInQueue,
            slot:{
                date:appointment.slot.date,
                startTime:appointment.slot.startTime,
                endTime:appointment.slot.endTime
            }
        })

    }
    catch(error){
        res.status(500).send(error.message)
    }
}

const updateAppointmentStatus=async(req,res)=>{
    try{
        const {appointmentId}=req.params
        const {status}=req.body
        const appointment=await Appointment.findById(appointmentId)
        if(!appointment){
            return res.status(404).send({
                message:"Appointment Not Found"
            })
        }
        const currentStatus=appointment.status
        const allowedTransitions={
            booked:["in queue","cancelled"],
            "in queue":["ongoing","cancelled"],
            ongoing:["completed"],
            completed:[],
            cancelled:[]
        }
        if(!allowedTransitions[currentStatus].includes(status)){
            return res.status(400).send({
                message:`Cannot change status from ${currentStatus} to ${status}`
            })
        }
        if(status=="ongoing"){
            const ongoingExists=await Appointment.find({
                slot:appointment.slot,
                status:"ongoing"
            })
            if(ongoingExists){
                return res.status(400).send({
                    message:"Another appointment is already ongoing for this slot"
                })
            }
        }
        appointment.status=status
        await appointment.save()
        return res.status(200).send({
            message:"Appointment Status Updated Successfully",
            appointmentId:appointment._id,
            previousStatus:currentStatus,
            currentStatus:appointment.status
        })


    }
    catch(error){
        res.status(500).send(error.message)
    }
}
module.exports={bookAppointment,getQueueStatus,updateAppointmentStatus}