import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate('')
  const { backendUrl, token, updateAppointmentPaymentStatus, selectedAppointment, setSelectedAppointment } = useContext(AppContext);

  const markPaymentAsPaid = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/update-payment`, { appointmentId }, { headers: { token } }
    );

      if (data.success) {
        updateAppointmentPaymentStatus(appointmentId); // Update the state in AppContext
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update payment status.');
    }
  };


  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/user/verify-payment`,
          { sessionId },
          { headers: { token } }
        );

        if (data.success) {
          // toast.success("Payment verified successfully!");
          setSelectedAppointment(localStorage.getItem('selectedAppointment'))
          if (selectedAppointment) {
            updateAppointmentPaymentStatus(selectedAppointment)
            await markPaymentAsPaid(selectedAppointment);
            navigate('/my-appointments')
          }
          
        } else {
          toast.error("Payment verification failed");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while verifying the payment");
      }
    };

    if (sessionId) verifyPayment();
  }, []);

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Your payment has been processed. Thank you!</p>
    </div>
  );
};

export default SuccessPage;
