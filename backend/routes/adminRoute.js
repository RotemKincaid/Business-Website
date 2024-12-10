import express from 'express'
import { addService, allServices, loginAdmin, appointmentsAdmin, cancelAppointment, adminDashboard } from '../controllers/adminController.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js'

const adminRouter = express.Router()

adminRouter.post('/add-service', authAdmin , upload.fields([
    { name: 'image', maxCount: 5 }, // for multiple service images
    { name: 'image_icon', maxCount: 1 } // for a single service icon
  ]), addService)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-services',authAdmin, allServices)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, cancelAppointment)
adminRouter.get('/dashboard', authAdmin, adminDashboard )

export default adminRouter