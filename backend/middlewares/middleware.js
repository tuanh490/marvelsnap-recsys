import Collection from "../models/Collection.js";

export function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized access.' });
}

export async function isUser(req, res, next) {
    const { id } = req.params;
    const collection = await Collection.findById(id);
    if (!collection.user.equals(req.user._id)) {
        res.status(401).json({ error: 'Unauthorized access.' });
    }
    next()
}