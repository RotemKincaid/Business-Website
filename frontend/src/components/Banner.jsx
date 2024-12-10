import { NavLink, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { useContext } from "react"
import { AppContext } from '../context/AppContext' 
const Banner = () => {
  const navigate = useNavigate()

  const { token } = useContext(AppContext)
  return (
    <div className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
        {/* Left Side */}
     <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
            <p>Book Appointment</p>
            <p className="mt-4">And Say Hello To Smoother Skin </p>
        </div>
        { token ?
          <button onClick={() => { navigate('/services'); scrollTo(0,0)}} className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105">
          Book a Service
          </button>
          : <button 
            onClick={() => { navigate('/login'); scrollTo(0,0)}} className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105">
              Create Account
          </button>}
          <p className="text-gray-600 pl-1 mt-2 text-sm">Already have an account? <NavLink className="text-indigo-600" to="/login">Log in</NavLink></p>
     </div>

     {/* Right Side */}
     <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img className="w-full absolute bottom-[-3px] right-0 max-w-md" src={assets.legs} />
     </div>
    </div>
  )
}

export default Banner