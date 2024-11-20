import { useState, createContext } from "react"
import { toast } from 'react-toastify'
import axios from 'axios'
import { useContext } from "react"
import { AdminContext } from "./AdminContext"

export const ServiceContext = createContext()

const ServiceContextProvider = (props) => {
    const [ aToken, setAToken ] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const { getAllAppointments } = useContext(AdminContext)

    const completeAppointment = async (appointmentId) => {

        try {
            const { data } = await axios.post(backendUrl + "/api/service/complete-appointment", { appointmentId }, { headers: {aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const cancelAppointment = async (appointmentId) => {

        try {
            const { data } = await axios.post(backendUrl + "/api/service/cancel-appointment", { appointmentId }, { headers: {aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const value =  {
        completeAppointment,
        cancelAppointment
    }

    return (
        <ServiceContext.Provider value={value}>
            {props.children}
        </ServiceContext.Provider>
    )
}

export default ServiceContextProvider
