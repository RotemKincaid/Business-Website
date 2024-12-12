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
      const { userId, serviceId, slotDate, slotTime } = req.body;
  
      // Step 1: Check if the slot is already booked
      const existingAppointment = await appointmentModel.findOne({
        serviceId,
        slotDate,
        slotTime,
        cancelled: false,
        isCompleted: false,
      });
  
      if (existingAppointment) {
        return res.json({ success: false, message: 'Slot already booked' });
      }
  
      // Step 2: Save the new appointment
      const serviceData = await serviceModel.findById(serviceId);
      const userData = await userModel.findById(userId).select('-password');
  
      const newAppointment = new appointmentModel({
        userId,
        serviceId,
        userData,
        serviceData,
        amount: serviceData.fee,
        slotTime,
        slotDate,
        date: Date.now(),
      });
  
      await newAppointment.save();
  
      // Step 3: Return the updated available slots
      res.json({
        success: true,
        message: 'Appointment booked successfully',
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      res.json({ success: false, message: error.message });
    }
  };
  

// API to get user appointments
const appointmentList = async (req, res) => {
    try {
        
        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })
        if (!appointments || appointments.length === 0) {
            return res.status(404).json({ success: false, message: "No appointments found." });
        }

        res.json({ success: true,  appointments})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to fetch available appointments
const getAvailableAppointments = async (req, res) => {
    try {
        const { date } = req.query;  // Get date from query params

        // Normalize to start of day in UTC (if necessary)
        const selectedDate = new Date(date);  // Parse the date from query
        const startOfDayUTC = new Date(Date.UTC(selectedDate.getUTCFullYear(), selectedDate.getUTCMonth(), selectedDate.getUTCDate()));
        const endOfDayUTC = new Date(startOfDayUTC);
        endOfDayUTC.setUTCDate(startOfDayUTC.getUTCDate() + 1);  // Next day (23:59:59)

        // Step 1: Fetch all services (since the user can select any service)
        const services = await serviceModel.find();
        if (!services || services.length === 0) {
            return res.json({ success: false, message: 'No services found' });
        }
    
        // Step 2: Get all appointments booked for any service on this date
        const bookedAppointments = await appointmentModel.find({
            slotDate: date,
            cancelled: false,
            isCompleted: false,
        });
    
        // Step 3: Gather all booked times across all appointments
        const bookedTimes = bookedAppointments.map(appointment => appointment.slotTime);
    
        // Step 4: Get all available slots from all services, but exclude booked times
        const availableSlots = services.map(service => {
  
            // Filter out the booked times from the service's slotTimes
            const availableTimes = service.slotTimes.filter(slotTime => {
            const isBooked = bookedTimes.includes(slotTime);  // Check if this time is already booked
            console.log(`SlotTime: ${slotTime}, Is Booked: ${isBooked}`);
            return !isBooked;
            });
    
            return {
            serviceId: service._id,
            serviceName: service.name,
            availableTimes,
            }
        })
  
        //   Step 5: If no slots are available for any service, return an error
        if (availableSlots.every(service => service.availableTimes.length === 0)) {
            return res.json({ success: false, message: 'No available slots for this date' });
        }
    
        // Step 6: Return available slots for all services on this date
        res.json({
            success: true,
            availableSlots,
        });
    } catch (error) {
      console.error('Error fetching available slots:', error);
      res.json({ success: false, message: 'Error fetching available slots', error: error.message });
    }
};
  

// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        // Step 1: Find the appointment data
        const appointmentData = await appointmentModel.findById(appointmentId);

        // Step 2: Verify the appointment belongs to the user
        if (appointmentData.userId.toString() !== userId.toString()) {
            return res.json({ success: false, message: "Unauthorized action" });
        }

        // Step 3: Mark the appointment as cancelled
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Step 4: If necessary, update other models or perform other actions (this could be logging, notifying, etc.)
        // As you mentioned, we don't need to adjust the service slot anymore, just the appointment itself.

        res.json({ success: true, message: "Appointment Cancelled" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
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


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, appointmentList, cancelAppointment, makePayment, updatePayment, verifyPayment, getAvailableAppointments }