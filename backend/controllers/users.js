import User from '../models/User.js'
import Collection from "../models/Collection.js"
import ExpressError from '../utils/ExpressError.js';
import passport from '../passportStrategy.js'

export async function register(req, res, next) {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser)
        return res.status(400).json({ message: 'Username is already in use' })

    const user = new User({ username, password })
    await user.save();
    const collection = new Collection({ user });
    await collection.save();

    req.login(user, err => {
        if (err) return next(err);
        return res.status(201).json({ message: 'User registered and logged in successfully!' });
    })
}

export function login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to log in' });
            }
            return res.json({ message: 'Logged in successfully', user });
        });
    })(req, res, next);
}

export function logout(req, res) {
    req.logout((err) => {
        if (err)
            return res.status(500).json({ error: 'Failed to log out' })

        res.json({ message: 'Logged out Successfully' })
    })
}

export function getProfile(req, res) {
    res.json({ message: `Hello, ${req.user.username}!` });
}