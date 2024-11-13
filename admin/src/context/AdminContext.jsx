import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify' 
export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [ aToken, setAToken ] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [ services, setServices ] = useState([])
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

    const value =  {
        aToken, setAToken,
        backendUrl, services, getAllServices
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
