const express=require("express")
const {createService,allServices, activeServices, updateService, toggleServiceStatus}=require("../controllers/service.controller")
const authMiddleware = require("../middleware/auth.middleware")
const adminMiddleware = require("../middleware/admin.middleware")
const router=express.Router()

router.post("/create",authMiddleware,adminMiddleware,createService)
router.get("/",authMiddleware,adminMiddleware,allServices)
router.get("/active",activeServices)
router.put("/update/:id",authMiddleware,adminMiddleware,updateService)
router.patch("/toggle/:id",authMiddleware,adminMiddleware,toggleServiceStatus)
module.exports=router