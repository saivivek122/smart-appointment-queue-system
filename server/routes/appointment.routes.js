const express=require("express")

const authMiddleware = require("../middleware/auth.middleware")
const { bookAppointment, getQueueStatus, updateAppointmentStatus } = require("../controllers/appointment.controller")
const routes=express.Router()

routes.post("/",authMiddleware,bookAppointment)
routes.get("/:appointmentId",authMiddleware,getQueueStatus)
routes.patch("/:appointmentId",updateAppointmentStatus)


module.exports=routes