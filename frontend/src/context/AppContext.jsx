import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const businessName = "illumi"

    const [ services, setServices ] = useState([])
    const [ token, setToken ] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [ userData, setUserData ] = useState(false)

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


    const loadUserProfileData = async () => {
        try {
            
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', {headers: {token}})
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const value = {
        services,
        currencySymbol,
        businessName,
        backendUrl, 
        token, 
        setToken,
        userData,
        setUserData,
        loadUserProfileData
    }

    useEffect(() => {
        getServicesData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider