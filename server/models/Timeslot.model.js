const mongoose=require("mongoose")

const timeSlotSchema=new mongoose.Schema({
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service",
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
    startTime:{
        type:String,
        required:true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/
    },
    endTime:{
        type:String,
        required:true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/
    },
    activeStatus:{type:Boolean,default:true}
},{timestamps:true})
const TimeSlot=mongoose.model("TimeSlot",timeSlotSchema)
module.exports=TimeSlot