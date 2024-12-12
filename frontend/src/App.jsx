import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Cancel from "./components/Cancel"
import Success from "./components/Success"
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/services" element={<Services />}/>
        <Route path="/services/:service" element={<Services />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/privacy" element={<PrivacyPolicy />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/my-profile" element={<MyProfile />}/>
        <Route path="/my-appointments" element={<MyAppointments />}/>
        <Route path="/appointment/:serviceId" element={<Appointment />}/>
        <Route path="/cancel" element={<Cancel />}/>
        <Route path="/success" element={<Success />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App