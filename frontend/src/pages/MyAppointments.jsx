import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { parseISO, format } from 'date-fns';

const MyAppointments = () => {
  const { backendUrl, token, getServicesData, appointments, setSelectedAppointment, currencySymbol } = useContext(AppContext);

  const [ cancelledAppointments, setCancelledAppointments ] = useState([])
  const [ pastAppointments, setPastAppointments ] = useState([])
  const [ futureAppointments, setFutureAppointments ] = useState([])

  const formatDateString = (dateStr) => {
    try {
      // Check if the date is in ISO format (YYYY-MM-DD)
      if (dateStr.includes('-')) {
        const jsDate = parseISO(dateStr); // Assumes 'YYYY-MM-DD' format
        if (isNaN(jsDate)) throw new Error("Invalid Date");
    
        return format(jsDate, 'MMMM d, yyyy'); // Example: December 11, 2023
      }
  
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Invalid Date';  // Return fallback value
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getServicesData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const makePayment = async (appointmentId, service) => {
    localStorage.setItem('selectedAppointment', appointmentId);

    try {
      const body = { appointmentId, service };

      const { data } = await axios.post(backendUrl + "/api/user/make-payment", body);

      if (data.url) {
        window.location.assign(data.url); // Redirect to Stripe Checkout
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserAppointments = async () => {
    try {
        const { data } = await axios.get(backendUrl + "/api/user/appointments", { headers: { token } });
        
        if (data.success) {
            // Get today's date in the format 'YYYY-MM-DD'
            let today = new Date();
            today = today.toISOString().split('T')[0];  // Format: 'YYYY-MM-DD'
            
            let pastAppointmentsArray = [];
            let futureAppointmentsArray = [];
            let cancelledAppointmentsArray = [];

            // Iterate over the appointments data and classify them
            data.appointments.forEach(appointment => {
                // Ensure slotDate is in 'YYYY-MM-DD' format for comparison
                const appointmentDate = appointment.slotDate.split('T')[0];  // Assume slotDate is in ISO format 'YYYY-MM-DD'

                // Check if the appointment is cancelled
                if (appointment.cancelled) {
                    cancelledAppointmentsArray.push(appointment);  // Cancelled appointment
                }
                // Check if the appointment is in the past
                else if (appointmentDate <= today && !appointment.cancelled) {
                    pastAppointmentsArray.push(appointment);  // Past appointment
                }
                // Check if the appointment is in the future or today
                else if (appointmentDate > today && !appointment.cancelled) {
                    futureAppointmentsArray.push(appointment);  // Future appointment (including today)
                }
            });

            // Sort future appointments by date in ascending order (closest to today first)
            futureAppointmentsArray.sort((a, b) => {
                const dateA = new Date(a.slotDate);
                const dateB = new Date(b.slotDate);
                return dateA - dateB;  // Sort in ascending order by date
            });

            // Set the state for the various categories of appointments
            setCancelledAppointments(cancelledAppointmentsArray.reverse());  // Reverse to show most recent first
            setPastAppointments(pastAppointmentsArray.reverse());  // Reverse to show most recent first
            setFutureAppointments(futureAppointmentsArray);  // Sorted future appointments

        } else {
            toast.error(data.message);  // Show error toast if data is unsuccessful
        }
    } catch (error) {
        toast.error(error.message);  // Show error toast if there's an error
        console.log(error);  // Log error to console for debugging
    }
};


  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  useEffect(() => {
    // Retrieve selected appointment from localStorage after page reload
    const appointment = localStorage.getItem('selectedAppointment');
    if (appointment) {
      setSelectedAppointment(appointment); // Restore the selected appointment value
    }
  }, []);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>
      <div>
        {futureAppointments &&
          futureAppointments.map((item, index) => (
            <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
              <div>
                <img className="w-32 bg-indigo-50" src={item.serviceData.image_icon} alt="" />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.serviceData.service}</p>
                <p>{item.serviceData.about}</p>
                <p className="text-xs">
                <span className="text-sm text-neutral-700 font-medium">Date & Time:</span>{" "}
                {formatDateString(item.slotDate)} | {item.slotTime}
              </p>
              <p>{currencySymbol}{item.amount}</p>
                <p>Status: {item.payment ? <span className="text-green-500">Paid</span> : "Pending Payment"}</p>
              </div>

              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => makePayment(item._id, item.serviceData)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                )}
                 {item.payment && (
                  <button
                    className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50"
                  >
                    Paid
                  </button>
                )}
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment cancelled
                  </button>
                )}
                {item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>}
              </div>
            </div>
          ))}
        {!appointments && <div>No Appointments Found</div>}
      </div>
      <details>
        <summary className="pb-3 mt-12 font-medium text-green-700 border-b">Past appointments</summary>

        {pastAppointments &&
          pastAppointments.map((item, index) => (
            <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
              <div>
                <img className="w-32 bg-indigo-50" src={item.serviceData.image_icon} alt="" />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.serviceData.service}</p>
                <p>{item.serviceData.about}</p>
                <p className="text-xs">
                <span className="text-sm text-neutral-700 font-medium">Date & Time:</span>{" "}
                {formatDateString(item.slotDate)} | {item.slotTime}
              </p>
              <p>{currencySymbol}{item.amount}</p>
                <p>Status: {item.payment ? <span className="text-green-500">Paid</span> : "Pending Payment"}</p>
              </div>

              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => makePayment(item._id, item.serviceData)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                )}
                 {item.payment && (
                  <button
                    className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50"
                  >
                    Paid
                  </button>
                )}
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment cancelled
                  </button>
                )}
                {item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>}
              </div>
            </div>
          ))}
        </details>
      <details>
        <summary className="pb-3 mt-12 font-medium text-red-700 border-b">Cancelled appointments</summary>
        {cancelledAppointments &&
          cancelledAppointments.map((item, index) => (
            <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
              <div>
                <img className="w-32 bg-indigo-50" src={item.serviceData.image_icon} alt="" />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.serviceData.service}</p>
                <p>{item.serviceData.about}</p>
                <p className="text-xs">
                <span className="text-sm text-neutral-700 font-medium">Date & Time:</span>{" "}
                {formatDateString(item.slotDate)} | {item.slotTime}
              </p>
              <p>{currencySymbol}{item.amount}</p>
                <p>Status: {item.payment ? <span className="text-green-500">Paid</span> : "Pending Payment"}</p>
              </div>

              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => makePayment(item._id, item.serviceData)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                )}
                 {item.payment && (
                  <button
                    className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50"
                  >
                    Paid
                  </button>
                )}
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.cancelled && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Appointment cancelled
                  </button>
                )}
                {item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">Completed</button>}
              </div>
            </div>
          ))}
          </details>
        {!appointments && <div>No Appointments Found</div>}

    </div>
  );
};

export default MyAppointments;
