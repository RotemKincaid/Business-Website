import serviceModel from '../models/serviceModel.js'

const serviceList = async (req, res) => {
  try {
    const services = await serviceModel.find({})
    res.json({ success: true, services })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { serviceList }