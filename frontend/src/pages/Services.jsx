import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from '../context/AppContext'

const Services = () => {

  const navigate = useNavigate()
  const { service } = useParams()
  const [ filterTreatment, setFilterTreatment ] = useState([])
  const [showFilter, setShowFilter ] = useState(false)
  const { treatmentsData } = useContext(AppContext)

  const applyFilter = () => {
    if (service) {
      setFilterTreatment(treatmentsData.filter(t => t.name === service))
    } else {
      setFilterTreatment(treatmentsData)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [treatmentsData, service])

  return (
    <div>
      <p className="text-gray-600">Browse through the services.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters:</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'} `}>
          <p onClick={() => service === 'scars' ? navigate('/services') : navigate('/services/scars')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${service === "scars" ? 'bg-indigo-100 text-black' : ''}`}>Scars</p>
          <p onClick={() => service === 'stretchmarks' ? navigate('/services') : navigate('/services/stretchmarks')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${service === "stretchmarks" ? 'bg-indigo-100 text-black' : ''}`}>Stretch Marks</p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {
            filterTreatment.map((t, idx) => (
              <div key={idx} onClick={() => navigate(`/appointment/${t._id}`)} className="border border-gray-50 hover:translate-y-[-10px] transition-all duration-500 cursor-pointer">
                <img className="bg-blue-50 w-40 p-4" src={t.image} alt="" />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full" />
                      <p>Available</p>
                  </div>
                  <p className="text-grey-900 text-lg font-medium">{t.service}</p>
                  <p className="text-gray-600 text-sm">{t.about}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Services