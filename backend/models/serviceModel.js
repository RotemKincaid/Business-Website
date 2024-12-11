import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema({
    stripe_product_id: { type: String, required: true },
    name: { type: String, required: true },
    service: { type: String, required: true },
    about: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    image_icon: { type: String, required: true },
    fee: { type: Number, required: true },
    date: { type: Number, required: true },
    slotTimes: {
        type: [String], // Array of time slots (e.g., ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM"])
        default: [
          '09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'
        ]
    }
}, { minimize: false })

const serviceModel = mongoose.models.service || mongoose.model('service', serviceSchema)

export default serviceModel