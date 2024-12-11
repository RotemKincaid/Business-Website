import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency = "$"

    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const formatDate = (slotDate) => {
        console.log("Original slotDate:", slotDate);
    
        try {
            // If the slotDate is in ISO format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ), handle that
            if (slotDate.includes('-')) {
                // No need to convert it to a JavaScript Date, just format as is
                const [year, month, day] = slotDate.split('-');  // Split the ISO format
                const formattedDate = `${month}/${day}/${year}`; // Format it as MM/DD/YYYY
                return formattedDate;
            }
    
            // If the date is in DD_MM_YYYY format (e.g., '23_11_2024')
            const dateParts = slotDate.split('_');
            if (dateParts.length !== 3) throw new Error("Invalid date format");
    
            const [day, month, year] = dateParts;
            const formattedDate = `${month}/${day}/${year}`; // Format as MM/DD/YYYY
    
            return formattedDate; // Return the formatted date string directly
    
        } catch (error) {
            console.error("Error formatting date:", error);
            return 'Invalid Date';  // Return fallback value if there's an error
        }
    };
    

    const value =  {
        currency,
        calculateAge,
        formatDate
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
