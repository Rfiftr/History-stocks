const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express()
const axios = require('axios');
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())

// MongoDB connection
const User = require('../models/User');
mongoose.connect('mongodb://localhost:27017/stock_history')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB: ', err))


const ALPHA_VANTAGE_API_URLL = process.env.ALPHA_VANTAGE_URL;
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

async function getStockData(symbol) {
    try {
        const response = await axios.get(ALPHA_VANTAGE_API_URLL, {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol: symbol.toUpperCase(),
                apikey: API_KEY
            }
        });

        const stockData = response.data['Global Quote'];
        if (stockData) {
            return stockData;
        } else {
            throw new Error('Stock not found');
        }
    } catch (error) {
        throw new Error(error);
    }
}

// Returning website pages
app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.get('/calculatePage', (req, res) => {
    res.sendFile(/* calculate page */)
})

app.get('/stockListPage', (req, res) => {
    res.sendFile(/* stock list page */)
})


// Handling website requests
app.get('/stock', async (req, res) => {
    const symbol = "VOO";

    try {
        const stockData = await getStockData(symbol)
        res.send(stockData)
    } catch (error) {
        throw new Error(error)
    }
})


// Registar & Login
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const emailCheck = await User.findOne({ email });
        if (!emailCheck) {
            const user = new User({ username, email, password });
            await user.save();
            res.status(201).send('User created successfully!');
        } else {
            res.status(409).send(`The email - ${email} is already registered`);
        }
    } catch (err) {
        res.status(400).send(`Error creating user: ${err}`);
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            res.status(201).send('Login successfully');
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (err) {
        res.status(400).send('Error logging in ', err);
    }
})



// Server listening to clients
app.listen(3000, () => {
    console.log("server listen on port 3000");
})