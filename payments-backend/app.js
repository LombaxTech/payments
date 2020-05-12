const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();


// * Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// * Routes
const paymentRoutes = require('./routes/payment');

// * Route middleware
app.use('/api', paymentRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log('started listening'));