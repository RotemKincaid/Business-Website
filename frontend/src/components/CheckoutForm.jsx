import { useState, useEffect } from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create a PaymentIntent on your server
    const fetchClientSecret = async () => {
      const response = await axios.post('/create-payment-intent', {
        amount: 1000, // Amount in cents
        currency: 'usd',
      });
      setClientSecret(response.data.clientSecret);
    };

    fetchClientSecret();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripePromise) {
      return;
    }

    const stripe = await stripePromise;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Pass the client secret obtained from your server
        clientSecret,
      },
    });

    if (error) {
      // Show error to your customer
      console.error(error.message);
    } else {
      // The payment has been processed!
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!clientSecret}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm
