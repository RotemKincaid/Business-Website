import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { useState } from 'react'

const NavBar = () => {
    const navigate = useNavigate()

    const [ showMenu, setShowMenu ] = useState(false)
    const [ token, setToken ] = useState(true)

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={() => navigate('/')} src={assets.logo} alt="" className='w-2/6 cursor-pointer relative'/>
        <ul className='hidden md:flex items-start gap-5 font-medium pt-3'>
            <NavLink to="/">
                <li>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to="/services">
                <li>SERVICES</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink >   
            <NavLink to="/about">
                <li>ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>   
            <NavLink to="/contact">
                <li>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className='pt-3 flex items-center gap-4'>
            { token ? 
              <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img src={assets.profilePic} alt="" className='w-20 rounded-full' />
                <img src={assets.dropdown} alt="" className='w-2.5'/>
                <div className='absolute top-0 right-0 pt-20 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                        <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                        <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointements</p>
                        <p onClick={() => setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
              </div> 
            :     
               <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full front-light hidden md:block'>Create Account</button>
            }
       
        </div>
    </div>
  )
}

export default NavBar