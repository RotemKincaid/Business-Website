import express from 'express'
import { serviceList, appointmentComplete, appointmentCancel } from '../controllers/serviceController.js'
import authAdmin from '../middleware/authAdmin.js'

const serviceRouter = express.Router()

serviceRouter.get('/list', serviceList)
serviceRouter.post('/complete-appointment', authAdmin,  appointmentComplete)
serviceRouter.post('/cancel-appointment', authAdmin,  appointmentCancel)

export default serviceRouter
