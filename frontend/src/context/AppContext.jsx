import { createContext } from "react";
import { treatmentsData } from "../assets/assets";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '$'

    const value = {
        treatmentsData, currencySymbol
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider