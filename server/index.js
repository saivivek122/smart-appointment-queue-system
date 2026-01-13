const express=require("express")
const connectDb = require("./config/connectDb")
const cors=require("cors")
const userRoutes=require("./routes/user.route")
const serviceRoutes=require("./routes/service.route")
const timeSlotRoutes=require("./routes/timeslot.routes")
const appointmentRoutes=require("./routes/appointment.routes")
require("dotenv").config()
const app=express()
app.use(cors())
app.use(express.json())

// app.get("/",(req,res)=>{
//     res.send("Hii")
// })

app.use("/user",userRoutes)
app.use("/services",serviceRoutes)
app.use("/timeslot",timeSlotRoutes)
app.use("/appointment",appointmentRoutes)
connectDb()
app.listen(3000,(req,res)=>{
    console.log("Running on port 3000")

})