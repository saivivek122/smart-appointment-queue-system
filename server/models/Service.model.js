const mongoose=require("mongoose")
const serviceSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true,
        min:1
    },
    activeStatus:{
        type:Boolean,
        default:true
    }
},{timestamps:true})
const Service=mongoose.model("Service",serviceSchema)
module.exports=Service