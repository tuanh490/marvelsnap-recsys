import express from 'express'
import passport from '../passportStrategy.js'
import { register } from '../controllers/users.js'
import catchAsync from '../utils/CatchAsync.js'

const router = express.Router()

router.post('/register', catchAsync(register))

router.post('/login', (req, res, next) => {
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
});

router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err)
            return res.status(500).json({ error: 'Failed to log out' })

        res.json({ message: 'Logged out Successfully' })
    })
})

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized access.' });
}

router.get('/profile', isAuthenticated, (req, res) => {
    res.json({ message: `Hello, ${req.user.username}!` });
});

export default router
