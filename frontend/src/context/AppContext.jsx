import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const businessName = "Studio illumi";

  const [services, setServices] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : false);
  const [userData, setUserData] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState('')

  const getServicesData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/service/list");
      if (data.success) {
        setServices(data.services);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", { headers: { token } });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // const getUserAppointments = async () => {
  //   try {
  //     const { data } = await axios.get(backendUrl + "/api/user/appointments", { headers: { token } });
  //     if (data.success) {
  //       setAppointments(data.appointments.reverse());
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //     console.log(error);
  //   }
  // };

  const updateAppointmentPaymentStatus = (appointmentId) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment._id === appointmentId
          ? { ...appointment, payment: true }
          : appointment
      )
    );
  };

  const value = {
    services,
    getServicesData,
    currencySymbol,
    businessName,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    appointments,
    setAppointments,
    // getUserAppointments,
    updateAppointmentPaymentStatus,
    selectedAppointment,
    setSelectedAppointment
  };

  useEffect(() => {
    getServicesData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
      // getUserAppointments();
    } else {
      setUserData(false);
      setAppointments([]);
    }
  }, [token]);

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
