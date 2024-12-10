import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { serviceId } = useParams()
  const { services, currencySymbol, backendUrl, token, getServicesData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

  const navigate = useNavigate()

  const [ serviceInfo, setServiceinfo ] = useState(null)
  const [ serviceSlots, setServiceSlots ] = useState([])
  const [ slotIndex, setSlotIndex ] = useState(0)
  const [ slotTime, setSlotTime ] = useState('')


  const fetchServiceInfo = async () => {
    const info = await services.find((item) => item._id === serviceId
    )
    setServiceinfo(info)
  }

  const getAvailableSlots = async () => {
    setServiceSlots([])

    // Getting the current date
    let today = new Date()

    for (let i = 0; i < 7; i++) {
        // Clone the current date and set it to the desired day
        let currentDate = new Date(today)
        currentDate.setDate(today.getDate() + i)

        // Clone the current date to set the end time
        let endTime = new Date(currentDate)
        endTime.setHours(18, 0, 0, 0) // End time is 6:00 PM

        // Set the start time for each day
        if (i === 0) {
            // Today: Start from the current time or 9:00 AM, whichever is later
            console.log(today.getHours())
            const startHour = today.getHours() < 9 ? 9 : today.getHours()
            currentDate.setHours(startHour)
            currentDate.setMinutes(0)
        } else {
            // Future days: Start at 9:00 AM
            currentDate.setHours(9)
            currentDate.setMinutes(0)
        }

        // Array to store the day's available slots
        let timeSlots = []

        // Generate time slots in 2.5-hour intervals
        while (currentDate < endTime) {
            let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

            let day = currentDate.getDate()
            let month = currentDate.getMonth() + 1
            let year = currentDate.getFullYear()

            const slotDate = `${day}_${month}_${year}`
            const slotTime = formattedTime

            // Check if the slot is available
            const isSlotAvailable =
                serviceInfo.slots_booked[slotDate] &&
                serviceInfo.slots_booked[slotDate].includes(slotTime)
                    ? false
                    : true

            if (isSlotAvailable) {
                // Add the slot to the array
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime,
                })
            }

            // Increment current time by 2.5 hours (150 minutes)
            currentDate.setMinutes(currentDate.getMinutes() + 150)
        }

        // Add the day's slots to the service slots
        setServiceSlots((prev) => [...prev, timeSlots])
        console.log(serviceSlots)

    }
}



  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    try {

      const date = serviceSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', {serviceId, slotDate, slotTime}, {headers: {token}})

      if (data.success) {
        toast.success(data.message)
        getServicesData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchServiceInfo()
  }, [services, serviceId] )

  useEffect(() => {
    getAvailableSlots()
  }, [serviceInfo])


  return serviceInfo && (
    <div>
      {/* --------- Service Details -------- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className="bg-primary w-[400px] sm:max-w-[90vw] rounded-lg" src={assets.scar} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* ------- service info - name -------  */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{serviceInfo.service}</p>
      
          {/* ------- service about -  description -------  */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About 
              <img className="w-4" src={assets.infoIcon}/>
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{serviceInfo.description}</p>
          </div>
          <p className='text-graay-500 font-medium mt-4'>
            Appointment Fee: <span className='text-gray-600'>{currencySymbol}{serviceInfo.fee}</span>
          </p>
        </div>
      </div>

      {/* --- Booking Slots ---- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          { serviceSlots.length && serviceSlots.map((item, index) =>(
            <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-md cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray'}`} key={index}>
              <p>{ item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{ item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          { serviceSlots.length && serviceSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white': 'text-gray-400 border border-gray-300'}`} key={index}>{item.time.toLowerCase()}</p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book this time slot</button>
      </div>
    </div>
  )
}

export default Appointment