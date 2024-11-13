import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"


const ServiceList = () => {

  const { services, aToken, getAllServices } = useContext(AdminContext)

  useEffect(() => {
    if(aToken) {
      getAllServices()
    }
  }, [aToken]) 
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Services</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        { services.map((item, index) => (
          <div className="max-w-56 overflow-hidden cursor-pointer group" key={index}>
            <img className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image_icon} alt="" />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">{item.service}</p>
            </div>
            <p className='text-zinc-600 text-sm' >{item.about}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServiceList