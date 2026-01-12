const Service = require("../models/Service.model")

const createService=async(req,res)=>{
    try{
        const {name,description,duration,activeStatus}=req.body
        if(!name || !description || !duration ){
            return res.status(400).send("All fields are required")
        }
        let isExist=await Service.findOne({name})
        if(isExist){
            return res.status(409).send({
                message:"Service already exists"
            })
        }
        let service=await Service.create({name,description,duration,activeStatus})
        res.status(201).send({
            message:"New Service created",
            service

        })
    }
    catch(error){
        res.status(500).send(error.message)
    }
}
const allServices=async(req,res)=>{
    try{
        const services=await Service.find()
        if(services.length>0){
            res.status(200).send({
                message:"All services",
                services
            })
        }
        else{
            return res.status(404).send({
                message:"No services found"
            })
        }
    }
    catch(error){
        res.status(500).send(error.message)
    }
}
const activeServices=async(req,res)=>{
    try{
        const services=await Service.find({activeStatus:true})
        res.status(200).send({
            message:"Active Services",
            services
        })
    }
    catch(error){
        res.status(500).send(error.message)
    }

}
const updateService=async(req,res)=>{
    try{
        console.log("Hii")
        const {id}=req.params
        console.log(id)
        const {name,description,duration}=req.body
        const updatedService=await Service.findByIdAndUpdate(id,{...(name &&{name}),...(description&& {description}),...(duration && {duration})},{new:true})
        console.log(updatedService)
        if(!updatedService){
            return res.status(404).send({
                message:"No Service Found"
            })
        }
        res.status(200).send({
            message:"Service updated",
            service:updatedService
        })
    }
    catch(error){
        res.status(500).send(error.message)
    }
}
const toggleServiceStatus=async(req,res)=>{
    try{
        const {id}=req.params
        const service=await Service.findById(id)
        if(!service){
            return res.status(404).send({
                message:"Service Not Found"
            })
        }
        service.activeStatus=!service.activeStatus
        await service.save()
        res.status(200).send({
            message:"Service status updated",
            service
        })
    }
    catch(error){
        res.status(500).send(error.message)
    }
}
module.exports={createService,allServices,activeServices,updateService,toggleServiceStatus}