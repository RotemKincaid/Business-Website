import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Appointment = () => {
  const { serviceId } = useParams()
  const { treatmentsData, currencySymbol } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

  const [ serviceInfo, setServiceinfo ] = useState(null)
  const [ serviceSlots, setServiceSlots ] = useState([])
  const [ slotIndex, setSlotIndex ] = useState(0)
  const [ slotTime, setSlotTime ] = useState('')


  const fetchServiceInfo = async () => {
    const info = await treatmentsData.find((item) => JSON.stringify(item._id) === serviceId
    )
    setServiceinfo(info)
  }

  const getAvailableSlots = async () => {
    setServiceSlots([])

    // getting current date
    let today = new Date()

    for(let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // setting end time date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(18, 0, 0, 0)

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 9 ? currentDate.getHours() + 1.5 : 9)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(9)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        // increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 90)

      }
      setServiceSlots(prev => ([...prev, timeSlots]))

    }
  }

  useEffect(() => {
    fetchServiceInfo()
  }, treatmentsData, serviceId )

  useEffect(() => {
    getAvailableSlots()
  }, [serviceInfo])

  useEffect(() => {
    console.log(serviceSlots)
  }, [serviceSlots])

  return serviceInfo && (
    <div>
      {/* --------- Service Details -------- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className="bg-primary w-[400px] sm:max-w-[90vw] rounded-lg" src={serviceInfo.image} alt="" />
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
            Appointment Fee: <span className='text-gray-600'>{currencySymbol}299</span>
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
        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book this time slot</button>
      </div>
    </div>
  )
}

export default Appointment