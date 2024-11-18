import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'

const NavBar = () => {
    const navigate = useNavigate()

    const [ showMenu, setShowMenu ] = useState(false)
    const { token, setToken, userData } = useContext(AppContext)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }

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
            { token && userData ? 
              <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img src={userData.image} alt="" className='w-8 rounded-full' />
                <img src={assets.dropdown} alt="" className='w-2.5'/>
                <div className='absolute top-0 right-0 pt-20 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                        <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                        <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointements</p>
                        <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
              </div> 
            :     
               <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full front-light hidden md:block'>Create Account</button>
            }
            <img onClick={() => setShowMenu(true)} className="w-6 md:hidden" src={assets.menuIcon} alt="" />

            {/* ------ Mobile Menu ------ */}
            <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-4'>
                    <img className="w-36" src={assets.logo} alt="" />
                    <img className='w-6' onClick={() => setShowMenu(false)} src={assets.xIcon} alt="" />
                </div>
                <ul className='flex flex-col items-center gap-2 px-5 text-lg font-medium'>
                    <NavLink onClick={() => setShowMenu(false)} to="/"><p className="px-4 py-2 rounded inline-block">HOME</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to="/services"><p className="px-4 py-2 rounded inline-block">SERVICES</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to="/about"><p className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to="/contact"><p className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default NavBar