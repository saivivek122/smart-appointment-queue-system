const mongoose=require("mongoose")

const appointmentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service",
        required:true
    },
    slot:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TimeSlot",
        required:true
    },
    queuePosition:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        enum:["booked","in queue","ongoing","completed","cancelled"]
    }
},{timestamps:true})
appointmentSchema.index({user:1,service:1,slot:1},{unique:true})
const Appointment=mongoose.model("Appointment",appointmentSchema)
module.exports=Appointment