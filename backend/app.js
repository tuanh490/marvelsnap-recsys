import express from 'express';
import cors from 'cors'
import axios from 'axios'
import mongoose from 'mongoose';
import session from 'express-session'
import dotenv from 'dotenv'

import cardRoute from './routers/cards.js'
import userRoute from './routers/users.js'

import ExpressError from './utils/ExpressError.js'
import passport from './passportStrategy.js'

dotenv.config()

const app = express();

mongoose.connect('mongodb://localhost:27017/marvelsnap')
    .then(() => {
        console.log("Connect to db")
    }).catch(err => {
        console.log(err)
    });

const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const corsOption = {
    origin: ['http://localhost:5173']
}

app.use(cors(corsOption))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,           // Set to true if using https (recommended in production)
            httpOnly: true,          // Helps prevent XSS attacks
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration time for the session cookie
        },
    })
);

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', userRoute)
app.use('/card', cardRoute)

app.post('/predict', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/predict', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error calling FastAPI:', error.message);
        res.status(500).send('Error in FastAPI');
    }
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    if (!err.message) err.message = 'Oh No, Something went wrong!';

    if (req.accepts('json')) {
        res.status(statusCode).json({
            error: {
                message: err.message,
                status: statusCode,
            }
        });
    } else {
        res.status(statusCode).send({ err });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
