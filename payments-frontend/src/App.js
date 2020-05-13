import React from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe("pk_test_bE9nvfRJJMLP3geLvcp4RBhU00cZUCPk1n");


const App = () => {

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}

export default App;
