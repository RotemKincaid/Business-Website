import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import serviceModel from '../models/serviceModel.js'
import appointmentModel from '../models/appointmentModel.js'
import { Stripe } from 'stripe'

// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing details!"})
        } 

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email"})
        }

        // Validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password"})
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name, 
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({success: true, token})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message})
    }
}

// API for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get the user profile data
const getProfile = async (req, res) => {
    try {
        
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update the user profile
const updateProfile = async (req, res) => {
    try {

        const { userId, name, phone, address, gender, dob} = req.body
        const imageFile = req.file

        if (!name || !phone || !gender || !dob) {
            return res.json({success: false, message: "Missing Data"})
        } 

        await userModel.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, {image: imageURL})
        }

        res.json({ success: true, message: "Profile Updated"})
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book an appointment
const bookAppointment = async (req, res) => {

    try {
        
        const { userId, serviceId, slotDate, slotTime } = req.body

        const serviceData = await serviceModel.findById(serviceId)

        let slots_booked = serviceData.slots_booked

        // checking for slots availability
        if (slots_booked[slotDate]) {
        if (slots_booked[slotDate].includes(slotTime)) {
            return res.json({ success: false, message: 'Slot not available' })
        } else {
            slots_booked[slotDate].push(slotTime)
        }
        } else {
        slots_booked[slotDate] = []
        slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete serviceData.slots_booked

        const appointmentData = {
        userId,
        serviceId,
        userData,
        serviceData,
        amount: serviceData.fee,
        slotTime,
        slotDate,
        date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in serviceData
        await serviceModel.findByIdAndUpdate(serviceId, { slots_booked })

        res.json({ success: true, message: "Appointment Booked"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get user appointments
const appointmentList = async (req, res) => {
    try {
        
        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true,  appointments})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment
const cancelAppointment = async (req, res) => {

    try {

        const { userId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        // verify appointment user id
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action"})
        } 

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slot
        const { serviceId, slotDate, slotTime } = appointmentData
        const serviceData = await serviceModel.findById(serviceId)

        let slots_booked = serviceData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await serviceModel.findByIdAndUpdate(serviceId, { slots_booked })

        res.json({ success: true, message: "Appointment Cancelled"})
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



// API to make payment with stripe
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const makePayment = async (req, res) => {

    // scar camouflage: prod_RERWuFVXJeRzSB

    try {
        const { service } = req.body

        const lineItems =  []

        lineItems.push({
			price_data: {
				currency: 'usd',
				product_data: {
                    // product: 'prod_RERWuFVXJeRzSB',
					name: 'prod_RERWuFVXJeRzSB',
					description: service.description
				},
				unit_amount: 100
			},
			quantity: 1,
		});
    
        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`",
            cancel_url: "http://localhost:5173/cancel"
        })

        res.json({ success: true, url: session.url, session })

    } catch(error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updatePayment = async (req, res) => {
  
    try {
      const { appointmentId } = req.body;

      const updatedAppointment = await appointmentModel.findByIdAndUpdate(
        appointmentId,
        { payment: true }
      );
  
      if (updatedAppointment) {
        res.status(200).json({ success: true, appointment: updatedAppointment });
      } else {
        res.status(404).json({ success: false, message: 'Appointment not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to update payment status' });
    }
}

const verifyPayment = async (req, res) => {

    try {

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: 'prod_RERWuFVXJeRzSB',
                },
                unit_amount: 1000, // Amount in cents
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `http://localhost:5173/cancel`,
        });
    
        res.json({ url: session.url, success: true , });

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create Stripe session" });
      }
}


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, appointmentList, cancelAppointment, makePayment, updatePayment, verifyPayment }