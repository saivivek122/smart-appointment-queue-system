const User=require("../models/User.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
// require("dotenv").config()
 const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email ||!password){
            return res.status(400).send("All fields are required")
        }
        let isEmailExists=await User.findOne({email})
        if(isEmailExists){
            return res.status(409).send("Email already exists")
        }
    
            let hashedPassword=await bcrypt.hash(password,10)
            let newUser=await User.create({name,email,password:hashedPassword})
            res.status(201).send({
                message:"New User Created"
            })

      
    }
    catch(error){
        res.status(500).send(error.message)
    }
}
 const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).send("All fields are required")
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).send("User not found")
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            return res.status(401).send("Invalid credentials")
        }
        
        let token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"1d"})
        res.status(200).send({
            message:"Login Successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
    }
    catch(error){
        res.status(500).send(error.message)
    }
}
module.exports={registerUser,loginUser}
