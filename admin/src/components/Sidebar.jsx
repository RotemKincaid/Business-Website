import { useContext } from "react"
import { AdminContext } from "../context/AdminContext"
import { NavLink } from 'react-router-dom'
import { assets } from "../assets/assets"

const Sidebar = () => {

    const { aToken } = useContext(AdminContext)
  return (
    <div className="min-h-screen bg-white border-r"> 
        {
            aToken && <ul className="text-[#515151] mt-5">
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin-dashboard'}>
                  <img className="min-w-8 w-8" src={assets.home_icon} alt="" />
                  <p className="hidden md:block">Dashboard</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/all-appointments'}>
                  <img className="min-w-8 w-8" src={assets.appointment_icon} alt="" />
                  <p className="hidden md:block">Appintments</p>
                </NavLink>  
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/add-service'}>
                  <img className="min-w-8 w-8" src={assets.add_icon} alt="" />
                  <p className="hidden md:block">Add Service</p>
                </NavLink>  
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/service-list'}>
                  <img className="min-w-8 w-8" src={assets.listIcon} alt="" />
                  <p className="hidden md:block">Service List</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar