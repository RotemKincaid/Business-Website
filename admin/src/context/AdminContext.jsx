import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify' 
export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [ aToken, setAToken ] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [ services, setServices ] = useState([])
    const [ appointments, setAppointments ] = useState([])
    const [ dashData, setDashData ] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllServices = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-services', {}, {headers: { aToken }})
            if (data.success) {
                setServices(data.services)
                console.log(data.services)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const getAllAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken }})
            
            if(data.success) {
                setAppointments(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const cancelAppt = async (appointmentId) => {
        try {
            
            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', {appointmentId}, {headers: {aToken}})
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken }})
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const value =  {
        aToken, 
        setAToken,
        backendUrl, 
        services, 
        getAllServices,
        appointments, 
        setAppointments, 
        getAllAppointments,
        cancelAppt,
        dashData,
        getDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
