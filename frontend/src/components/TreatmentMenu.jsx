import { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TreatmentMenu = () => {
  const { services } = useContext(AppContext)

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800" id="treatment">
        <h1 className='text-3xl font-medium'>The Services</h1>
        <p className='sm:w-1/3 text-center text-sm'>Browse our treatments.
            {/* <br /> */}
            Not sure which one is right for you?
            <NavLink to="/contact" className="text-violet-600"> <br />Contact Us</NavLink>
        </p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
        {services.map((item, index) => (
            <Link onClick={() => scrollTo(0, 0)} className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500" key={index} to={`services/${item.name}`}>
                <img src={item.image_icon} alt="" className='w-40 sm:w-24 mb-2'/>
                <p className='uppercase'>{item.name}</p>
            </Link>
        ))}
        </div>
    </div>
  )
}

export default TreatmentMenu