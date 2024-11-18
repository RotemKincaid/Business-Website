import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, getServicesData, appointments, setAppointments, setSelectedAppointment } = useContext(AppContext);

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const formatDate = (slotDate) => {
    const dateArray = slotDate.split("_");
    return months[Number(dateArray[1])] + " " + dateArray[0] + " " + dateArray[2];
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", { headers: { token } });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

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
        {appointments &&
          appointments.map((item, index) => (
            <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
              <div>
                <img className="w-32 bg-indigo-50" src={item.serviceData.image_icon} alt="" />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.serviceData.service}</p>
                <p>{item.serviceData.about}</p>
                <p className="text-xs">
                  <span className="text-sm text-neutral-700 font-medium">Date & Time:</span>{" "}
                  {formatDate(item.slotDate)} | {item.slotTime}
                </p>
                <p>Status: {item.payment ? <span className="text-green-500">Paid</span> : "Pending Payment"}</p>
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && !item.payment && (
                  <button
                    onClick={() => makePayment(item._id, item.serviceData)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                )}
                 {item.payment && (
                  <button
                    className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500"
                  >
                    Paid
                  </button>
                )}
                {!item.cancelled && (
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
              </div>
            </div>
          ))}
        {!appointments && <div>No Appointments Found</div>}
      </div>
    </div>
  );
};

export default MyAppointments;
