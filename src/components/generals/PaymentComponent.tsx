// PaymentComponent.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { toast } from 'react-toastify';

interface PaymentComponentProps {
  matchType: string;
}

if (!process.env.REACT_APP_STRIPE_PK) {
  toast.error('stripe public key is not set.');
}
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK || 'pk_test_TYooMQauvdEDq54NiTphI7jx');

const PaymentComponent: React.FC<PaymentComponentProps> = ({ matchType }) => {
  return (
    <div>
      <h3 style={{textAlign: 'center'}}>You must pay $20 to use this feature for a month.</h3><br />
      <Elements stripe={stripePromise}>
        <CheckoutForm matchType={matchType} />
      </Elements>
    </div>
  );
};
export default PaymentComponent;