import express from 'express'
import { addService, allServices, loginAdmin } from '../controllers/adminController.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js'

const adminRouter = express.Router()

adminRouter.post('/add-service', authAdmin ,upload.single('image_icon') , addService)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-services',authAdmin, allServices)

export default adminRouter