import express from 'express';
import cors from 'cors'
import axios from 'axios'
import mongoose from 'mongoose';
import session from 'express-session'
import dotenv from 'dotenv'

import cardRoute from './routes/cards.js'
import userRoute from './routes/users.js'
import collectionRoute from './routes/collections.js'
import deckRoute from './routes/decks.js'

import ExpressError from './utils/ExpressError.js'
import passport from './passportStrategy.js'

import Card from './models/Card.js';
import Collection from './models/Collection.js';

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
    origin: ['http://localhost:5173'],
    credentials: true
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
            maxAge: 30 * 24 * 60 * 60 * 1000, // 1 day expiration time for the session cookie
        },
    })
);

app.use(passport.initialize())
app.use(passport.session())

app.use('/collection', collectionRoute)
app.use('/auth', userRoute)
app.use('/card', cardRoute)
app.use('/deck', deckRoute)

app.post('/predict', async (req, res) => {
    try {
        const collection = await Collection.findById(req.body.collection)
            .populate('cards', 'name')
            .exec()

        if (!collection) {
            return res.status(404).send('Collection not found');
        }

        const names = collection.cards.map(card => card.name);

        const data = {
            cards: req.body.cards,
            collection: names,
            n_decks: req.body.n_decks
        }

        const response = await axios.post('http://localhost:5000/predict', data);

        const decks = response.data.recommendations;

        const result = [];

        for (let deck of decks) {
            const resultDeck = []
            for (let name of deck) {
                const card = await Card.findOne({ name: name })

                resultDeck.push(card);
            }
            result.push(resultDeck)
        }

        res.json(result);
    } catch (error) {
        console.error('Error calling FastAPI:', error.message);
        res.status(500).send('Error in FastAPI');
    }
});

app.post('/predictForAll', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/predictForAll', req.body);

        const decks = response.data.recommendations;

        const result = [];

        for (let deck of decks) {
            const resultDeck = []
            for (let name of deck) {
                const card = await Card.findOne({ name: name })

                resultDeck.push(card);
            }
            result.push(resultDeck)
        }

        res.json(result);
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
