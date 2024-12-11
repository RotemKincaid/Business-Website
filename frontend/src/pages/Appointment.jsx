import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { serviceId } = useParams();
  const { services, currencySymbol, backendUrl, token, getServicesData } = useContext(AppContext);

  const navigate = useNavigate();

  const [serviceInfo, setServiceInfo] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetching service info
  const fetchServiceInfo = async () => {
    const info = await services.find((item) => item._id === serviceId);
    setServiceInfo(info);
  };

  // Format the date into the required format
  const formatDateString = (date) => {
    const day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits for day
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2 digits for month
    const year = date.getFullYear();
    return `${year}-${month}-${day}`; // Format to YYYY-MM-DD
  };

  // Fetch available slots for the selected date
  const getAvailableSlots = async (date) => {
    try {
      const dateStr = formatDateString(date); // Format the date into YYYY-MM-DD
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/user/available-appointments?serviceId=${serviceId}&date=${dateStr}`);
      setLoading(false);

      if (data.success) {
        console.log(data)
        // Instead of finding by `date`, match by `serviceId` and `availableTimes`
        const availableForService = data.availableSlots.find(slot => slot.serviceId === serviceId);

        if (availableForService) {
          console.log(availableForService); // Ensure the slots are available
          setAvailableTimes(availableForService.availableTimes);
        } else {
          toast.error('No available slots for this date.');
          setAvailableTimes([]);
        }
      } else {
        toast.error(data.message || 'No available slots found.');
        setAvailableTimes([]);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error('Error fetching available slots.');
    }
  };

  // Handle time selection
  const handleSlotClick = (time) => {
    setSelectedTime(time);
  };

  // Booking the appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }
  
    try {
      if (!selectedTime) {
        toast.error('Please select a valid time');
        return;
      }
  
      if (!selectedDate) {
        toast.error('Please select a valid date');
        return;
      }
  
      // Format the selected date as a string (ISO 8601 format is a good choice)
      const dateStr = formatDateString(selectedDate);
  
      // Prepare the payload to include both slotDate and slotTime
      const appointmentData = {
        serviceId,
        slotDate: dateStr,  // slotDate will be the formatted date string
        slotTime: selectedTime,  // slotTime will be the selected time
      };
  
      // Make the API request to book the appointment
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        appointmentData,  // Send the payload
        { headers: { token } }
      );
  
      if (data.success) {
        toast.success(data.message);
  
        // After booking, update the available slots locally
        setAvailableTimes((prevSlots) =>
          prevSlots.filter(
            (slot) =>
              !(slot.slotDate === dateStr && slot.slotTime === selectedTime)
          )
        );
  
        // Optionally, you can refresh other states as needed
        getServicesData();  // Refresh the services data (optional)
  
        // Redirect to the "my appointments" page
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchServiceInfo();
  }, [services, serviceId]);

  useEffect(() => {
    if (serviceInfo) {
      getAvailableSlots(selectedDate);
    }
  }, [serviceInfo, selectedDate]);

  return serviceInfo && (
    <div className="container mx-auto px-4 py-8">
      {/* Service Details Section */}
      <div className="flex flex-col sm:flex-row gap-8 mb-10">
        <div className="sm:w-[400px] max-w-full">
          <img className="w-full rounded-lg shadow-lg" src={serviceInfo.image} alt="Service" />
        </div>
        <div className="flex-1 bg-white p-8 rounded-lg shadow-md">
          <p className="text-3xl font-semibold text-gray-900">{serviceInfo.service}</p>
          <p className="text-sm text-gray-600 mt-2">{serviceInfo.description}</p>
          <p className="text-gray-800 font-semibold mt-4">
            Appointment Fee: <span className="text-primary">{currencySymbol}{serviceInfo.fee}</span>
          </p>
        </div>
      </div>

      {/* Date Selection Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 mt-6">
        <p className="text-xl font-medium text-gray-700 mb-6">Select Date and Time</p>

        {/* Calendar */}
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          className="react-calendar w-full"
        />

        {/* Available Time Slots */}
        <div className="mt-6">
          <p className="text-lg font-medium text-gray-700 mb-4">Available Time Slots for {selectedDate.toLocaleDateString()}</p>

          {loading ? (
            <p>Loading available times...</p>
          ) : availableTimes && availableTimes.length > 0 ? (
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              {availableTimes.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleSlotClick(slot)}
                  className={`px-6 py-2 rounded-full border-2 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${selectedTime === slot ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p>No available slots for this date.</p>
          )}
        </div>

        {/* Book Appointment Button */}
        <button
          onClick={bookAppointment}
          className="bg-primary text-white text-lg font-semibold py-3 px-12 mt-6 rounded-full w-full hover:bg-primary-dark transition duration-300"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Appointment;
