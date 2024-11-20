import { useContext } from "react"
import Login from "./pages/Login"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import { Routes, Route } from 'react-router-dom'
import NavBar from "./components/NavBar"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Admin/Dashboard"
import AllAppointments from "./pages/Admin/AllAppointments"
import AddService from "./pages/Admin/AddService"
import ServiceList from "./pages/Admin/ServiceList"
import PrivacyPolicy from "../../frontend/src/pages/PrivacyPolicy"

const App = () => {

  const { aToken } = useContext(AdminContext)

  return   aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <NavBar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllAppointments />}/>
          <Route path='/add-service' element={<AddService />}/>
          <Route path='/service-list' element={<ServiceList />}/>
          <Route path='/privacy' element={PrivacyPolicy} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App