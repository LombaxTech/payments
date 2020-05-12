import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import CardSection from './CardSection';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState('');
    async function init() {
        let result = await fetch('http://localhost:8000/api/paymentIntent');
        result = await result.json();
        setClientSecret(result.client_secret);
    }
    useEffect(() => {
        init();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Jenny Rosen',
                },
            }
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log('success')
            }
        }

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardSection />
                <button disabled={!stripe}>Confirm order</button>
            </form>
            {/* <h1>Client secret: {clientSecret}</h1> */}
            {/* {console.log(typeof clientSecret)} */}
        </div>
    );
}