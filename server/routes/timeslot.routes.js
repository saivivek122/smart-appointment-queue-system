const express=require("express")
const { createTimeSlot, getSlotsByService, activeSlotsByService, toggleSlotStatus } = require("../controllers/timeslot.controller")
const authMiddleware=require("../middleware/auth.middleware")
const adminMiddleware=require("../middleware/admin.middleware")
const router=express.Router()

router.post("/create",authMiddleware,adminMiddleware,createTimeSlot)
router.get("/:serviceId",authMiddleware,adminMiddleware,getSlotsByService)
router.get("/active/:serviceId",authMiddleware,activeSlotsByService)
router.patch("/toggle/:slotId",authMiddleware,adminMiddleware,toggleSlotStatus)


module.exports=router
