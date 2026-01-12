const User = require("../models/User.model")


const adminMiddleware=async(req,res,next)=>{
    try{
        const user=await User.findById(req.userId)
        if(!user || user.role!="admin"){
            return res.status(403).send("Admin access denied")
        }
        next()
    }
    catch(error){
        res.status(500).send(error.message)
    }
}
module.exports=adminMiddleware