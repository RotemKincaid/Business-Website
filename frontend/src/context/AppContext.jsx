import { createContext, useEffect, useState } from "react";
// import { treatmentsData } from "../assets/assets";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const businessName = "illumi"

    const [ services, setServices ] = useState([])

    const value = {
        services,
        currencySymbol,
        businessName,
        backendUrl
    }

    const getServicesData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/service/list')
            if (data.success) {
              setServices(data.services)
              console.log(services)
            } else {
              toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }


    useEffect(() => {
        getServicesData()
    }, [])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider