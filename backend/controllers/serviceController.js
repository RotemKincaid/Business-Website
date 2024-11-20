import serviceModel from '../models/serviceModel.js'
import appointmentModel from '../models/appointmentModel.js'

const serviceList = async (req, res) => {
  try {
    const services = await serviceModel.find({})
    res.json({ success: true, services })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to mark service as complete on the admin panel
const appointmentComplete = async (req, res) => {
  try {

    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
      return res.json({ success: true, message: "Appointment Completed"})
    } else {
      res.json({ success: false, message: "Mark Failed" })
    }
    
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// API to cancel appointment on the admin panel
const appointmentCancel = async (req, res) => {
  try {

    const { serviceId, appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData && appointmentData.serviceId === serviceId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
      return res.json({ success: true, message: "Appointment Cancelled"})
    } else {
      res.json({ success: false, message: "Cancellation Failed" })
    }
    
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { serviceList, appointmentComplete, appointmentCancel }