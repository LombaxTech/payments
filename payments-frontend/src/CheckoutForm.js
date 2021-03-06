import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

import CardSection from './CardSection';

const CheckoutForm = () => {

    const [name, setName] = useState('Eren');
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        if (!stripe || !elements) {
            return;
        }
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: name,
                },
            }
        });

        if (result.error) {
            console.log(result.error.message);
            console.log(result);
            setLoading(false);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log('success')
                console.log(result);
                setLoading(false)
            }
        }

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardSection />
                {/* <CardNumberElement />
                <CardExpiryElement />
                <CardCvcElement /> */}
                <button disabled={!stripe}>Confirm order</button>
            </form>
            {loading && (
                <h1>Processing...</h1>
            )}
        </div>
    );
}

export default CheckoutForm;