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
    slots_booked: { type: Object, default: {}}
}, { minimize: false })

const serviceModel = mongoose.models.service || mongoose.model('service', serviceSchema)

export default serviceModel