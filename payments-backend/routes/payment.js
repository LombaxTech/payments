const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_KxIPs4lg5Yrc8yey28svCIuJ00RTuBa9uJ');

router.get('/paymentIntent', async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'gbp',
        receipt_email: 'rakibkhan@live.co.uk',
        metadata: { integration_check: 'accept_a_payment' }
    })

    res.json({
        client_secret: paymentIntent.client_secret
    });
})


module.exports = router;