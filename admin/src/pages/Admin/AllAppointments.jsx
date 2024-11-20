import { useEffect, useContext } from "react"
import { AdminContext } from "../../context/AdminContext"
import { AppContext } from "../../context/AppContext"
import { assets } from "../../assets/assets"
import { ServiceContext } from "../../context/ServiceContext"

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppt } = useContext(AdminContext)
  const { completeAppointment } = useContext(ServiceContext)
  const { currency, calculateAge, formatDate } = useContext(AppContext)

  useEffect(() => {
    if(aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className="w-full max-w-6xl m-5">

      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_0.5fr_2fr_2fr_1fr_1fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Client Name</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Service</p>
          <p>Fee</p>
          <p>Paid</p>
          <p>Action</p> 
        </div>
        { appointments.reverse().map((item, index) => (
            <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_0.5fr_2fr_2fr_1fr_1fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50" key={index}>
              <p className="max-sm:hidden" >{index + 1}</p>
              <div className="flex items-center gap-1">
                <img className="w-8 rounded-full" src={item.userData.image} alt="" /><p>{item.userData.name}</p>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p>{formatDate(item.slotDate)}, {item.slotTime}</p>
              <div className="flex items-center gap-1">
                {/* <img className="w-8 rounded-full" src={item.serviceData.image} alt="" /> */}
                <p>{item.serviceData.service}</p>
              </div>
              <p>{currency}{item.amount}</p>
              <p>{item.payment ? 'Paid' : 'Pending'}</p>
              {
                item.cancelled
                  ? <p className="text-red-400 text-xs font-medium">Cancelled</p> 
                  : item.isCompleted 
                  ? <p className="text-green-400 text-xs font-medium">Completed</p> 
                  : <div className="flex">
                      <img onClick={() => cancelAppt(item._id)} className="w-8 cursor-pointer mr-1" src={assets.cancelIcon} alt="" /> 
                      <img onClick={() => completeAppointment(item._id)} className="w-8 cursor-pointer" src={assets.checkIcon} />
                    </div>
              }
            </div>
          ))}
      </div>
    </div>
  )
}

export default AllAppointments