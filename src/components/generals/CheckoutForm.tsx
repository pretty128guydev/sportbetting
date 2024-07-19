import React, { useContext } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import AuthContext from '../../context/authContext';
import { toast, ToastContainer } from 'react-toastify';

interface CheckoutFormProps {
  matchType: string;
}

// Define the CheckoutForm functional component
const CheckoutForm: React.FC<CheckoutFormProps> = ({ matchType }) => {
  // Get access to the stripe and elements objects
  const stripe = useStripe();
  const elements = useElements();
  const { user, login } = useContext(AuthContext);

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if Stripe and Elements are available
    if (!stripe || !elements) {
      return;
    }

    // Get the CardElement instance
    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      try {
        // Create the token using the createToken method
        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
          throw new Error(error.message);
        }

        if (token) {
          await handlePayment(token.id);
        }
      } catch (error: any) {
        console.error(error);
        toast.error(error?.message || 'An error occurred during payment.');
      }
    }
  };

  // Function to handle the payment and get the token.id
  const handlePayment = async (tokenId: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/payment', {
        token: tokenId,
        matchType: matchType,
        authUser: user
      });
      if (response.data.success) {
        // Set payment success state if successful
        toast.success('Now you can check out!');
        login(response.data.updateUser);
        console.log('updateUser => ', user);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while processing your payment.');
    }
  };

  // Render the form with CardElement and submit button
  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <CardElement/>
      <button 
         type="submit"
         style={stripe ? styles.submitButton : { ...styles.submitButton, ...styles.disabledButton }}
         disabled={!stripe}
      >
        Pay
      </button>
    </form>
  );
};
export default CheckoutForm;

const styles = {
  form: {
    width: '400px',
    margin: 'auto',
  },
  cardElement: {
    fontSize: '16px',
    color: '#32325d',
  },
  submitButton: {
    marginTop: '16px',
    padding: '10px 15px',
    backgroundColor: '#5cb85c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  disabledButton: {
    backgroundColor: '#b3b3b3', 
    cursor: 'not-allowed',
  },
  error: {
    color: 'red',
    marginTop: '8px',
  },
  success: {
    color: 'green',
    marginTop: '8px',
  },
};
