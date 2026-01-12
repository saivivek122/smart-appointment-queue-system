const jwt=require("jsonwebtoken")
const authMiddleware=(req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1]
        if(!token){
            return res.status(401).send("Access denied")
        }
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        req.userId=decoded.id
        next()
    }
    catch(error){
        res.status(401).send("Invalid token")
    }
}
module.exports=authMiddleware