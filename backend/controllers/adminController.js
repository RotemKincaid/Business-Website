// Will be used only if other people are added into the studio as service givers-
// import validator from "validator"
// import bcrypt from 'bcrypt'

import { v2 as cloudinary } from 'cloudinary'
import serviceModel from '../models/serviceModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

// API for adding service

const addService = async (req, res) => {
    try {

        const { name, service, about, description, fee, stripe_product_id
         } = req.body
        const imageIcon = req.files['image_icon'] ? req.files['image_icon'][0] : null;
        const imageFile = req.files['image'] ? req.files['image'][0] : null; // Expecting only one image
     
        // checking for missing data 
        if (!name || !service || !about || !description || !imageIcon || !imageFile || !fee || !stripe_product_id ) {
            return res.json({ success: false , message: "Missing Details"})
        } 

        // To be used only if other people are added into the studio as service givers:

        // validating email format
        // if (!validator.isEmail(email)) {
        //     return res.json({ success: false, message: "Please enter a valid email"})
        // }
        // // validating strong password
        // if (password.length < 8) {
        //     return res.json({ success: false, message: "Please enter a strong password"})
        // }

        // // hashing service giver password
        // const salt = await bcrypt.genSalt(10)
        // const hashedPassword = await bcrypt.hash(password, salt)

        // Upload image_icon to Cloudinary
        const imageIconUpload = await cloudinary.uploader.upload(imageIcon.path, { resource_type: "image" })
        const imageIconUrl = imageIconUpload.secure_url

        // Upload the main service image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const serviceData = {
            stripe_product_id,
            name,
            service, 
            about, 
            description,
            image_icon: imageIconUrl, // Cloudinary URL for the icon
            image: imageUrl, // Cloudinary URL for the image
            fee,
            date: Date.now()
        }

        const newService = new serviceModel(serviceData)
        await newService.save()

        res.json({ success: true, message: "Service Added"})

    } catch (error) {
        console.log("error from addService:", error)
        res.json({ success: false, message: error.message})
    }
}

// API for admin Login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message})
    }
}

// Api to get all services for admin panel
const allServices = async (req, res) => {
    try {
        const services = await serviceModel.find({})
        res.json({ success: true, services })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message})
    }
}

// API to get all appointments
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        // console.log("Appointments Found: ", appointments);  // Log appointments to see if data exists

        // Format the response to include slot date and time in the expected structure
        // const formattedAppointments = appointments.map(appointment => ({
        //     slotDate: appointment.slotDate, // assuming `slotDate` is stored in the appointment object
        //     slotTime: appointment.slotTime, // assuming `slotTime` is stored in the appointment object
        //     // Any additional data you may need
        // }));

        res.json({ success: true, appointments }); // Send back as 'slots' for the frontend to use
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {

    try {

        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slot
        const { serviceId, slotDate, slotTime } = appointmentData
        const serviceData = await serviceModel.findById(serviceId)

        let slotTimes = serviceData.slotTimes
        slotTimes[slotDate] = slotTimes[slotDate].filter(e => e !== slotTime)

        await serviceModel.findByIdAndUpdate(serviceId, { slotTimes })

        res.json({ success: true, message: "Appointment Cancelled"})
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Api to get Dashboard data for Admin panel
const adminDashboard = async (req, res) => {
    try {

        const services = await serviceModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})
        
        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            } 
        })

        const dashData = {
            services: services.length,
            appointments: appointments.length,
            clients: users.length,
            earnings,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
 

export { addService, loginAdmin, allServices, appointmentsAdmin, cancelAppointment, adminDashboard }