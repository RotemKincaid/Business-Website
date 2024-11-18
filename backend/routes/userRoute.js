import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, appointmentList, cancelAppointment, makePayment, verifyPayment, updatePayment } from '../controllers/userController.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointments', authUser, appointmentList)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)
userRouter.post('/make-payment', makePayment)
userRouter.post('/update-payment', authUser, updatePayment)
userRouter.post('/verify-payment', authUser, verifyPayment)

export default userRouter
 