import { assets } from "../../assets/assets"
import { useContext, useState } from "react"
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from "axios"

const AddService = () => {

  // const [serviceImg, setServiceImg] = useState(false)
  const [serviceIcon, setServiceIcon] = useState(false)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [about, setAbout] = useState('')
  const [fee, setFee] = useState('')
  const [stripeProductId, setStripeProductId] = useState('')
  const [description, setDescription] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (!serviceIcon) {
        return toast.error('Image Not Selected')
      }

      const formData = new FormData ()

      console.log(serviceIcon)
      // formData.append('image', serviceImg)
      formData.append('image_icon', serviceIcon)
      formData.append('name', name)
      formData.append('service', type)
      formData.append('about', about)
      formData.append('fee', Number(fee))
      formData.append('description', description)
      formData.append('stripe_product_id', stripeProductId)


      const { data } = await axios.post(backendUrl + '/api/admin/add-service', formData, { headers: { aToken }})

      if (data.success) {
        toast.success(data.message)
        setServiceIcon(false)
        setName('')
        setType('')
        setAbout('')
        setDescription('')
        setFee('')
        setStripeProductId('')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">
      Add Service
      </p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="service-img">
            <img className="w-16 bg-gray-100 rounded-full cursor-pointer" src={serviceIcon ? URL.createObjectURL(serviceIcon) : assets.uploadIcon} alt="" />
          </label>
          <input onChange={(e) => setServiceIcon(e.target.files[0]) } type="file" id="service-img" hidden/>
          <p>Upload Service <br /> Icon</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Service Name</p>
              <input onChange={(e) => setName(e.target.value)} className="border rounded px-3 py-2" type="text" placeholder="Name" value={name} required />
            </div>
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <p>Service Type</p>
              <input onChange={(e) => setType(e.target.value)}  className="border rounded px-3 py-2" type="text" placeholder="Type" value={type} required />
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <p>Stripe Product ID</p>
              <input onChange={(e) => setStripeProductId(e.target.value)}  className="border rounded px-3 py-2" type="text" placeholder="Type" value={stripeProductId} required />
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <p>About</p>
              <input onChange={(e) => setAbout(e.target.value)}  className="border rounded px-3 py-2" type="text" placeholder="Short Description of the service" value={about} required />
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <p>Service Fee</p>
              <input onChange={(e) => setFee(e.target.value)}  className="border rounded px-3 py-2" type="text" placeholder="Fee in USD" value={fee} required />
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <p className="mt-4 mb-2">Description</p>
              <textarea onChange={(e) => setDescription(e.target.value)} className="w-full border rounded px-4 pt-2" rows={5} placeholder="Longer Description" value={description} required />
            </div>
          </div>
        </div>

        <button type="submit" className="bg-primary px-10 py-3 mt-4 text-white rounded-full">Add Service</button>
      </div>
     {/* 
        name: { type: String, required: true },
        service: { type: String, required: true },
        about: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        image_icon: { type: String, required: true },
        fee: { type: Number, required: true },
        date: { type: Number, required: true },
        slots_booked: { type: Object, default: {}} 
      */}
    </form>
  )
}

export default AddService