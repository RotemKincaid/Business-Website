import { createContext } from "react";

export const ServiceContext = createContext()

const ServiceContextProvider = (props) => {
    const value =  {

    }

    return (
        <ServiceContext.Provider value={value}>
            {props.children}
        </ServiceContext.Provider>
    )
}

export default ServiceContextProvider
