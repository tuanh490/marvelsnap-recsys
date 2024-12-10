import User from '../models/User.js'
import ExpressError from '../utils/ExpressError.js';

export async function register(req, res) {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser)
        return new ExpressError('Username is already is use.', 400)

    const user = new User({ username, password })
    await user.save();

    res.status(201).json({ message: 'User registered successfully!' })
}