import mongoose from "mongoose";
import Collection from "../models/Collection.js";
import Deck from "../models/Deck.js";

export function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized access.' });
}

export async function isCollectionUser(req, res, next) {
    const { id } = req.params;
    const collection = await Collection.findById(id);
    if (!collection.user.equals(req.user._id)) {
        res.status(401).json({ error: 'Unauthorized access.' });
    }
    next()
}

export async function isDeckUser(req, res, next) {
    const { id } = req.params;
    const deck = await Deck.findById(id);
    if (!deck.user.equals(req.user._id)) {
        res.status(401).json({ error: 'Unauthorized access.' });
    }
    next()
}

export function doesObjectExist(object) {
    return async (req, res, next) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Missing object ID.' });
        }

        try {
            const collection = object === 'collection' ? await Collection.findById(id) : null;
            const deck = object === 'deck' ? await Deck.findById(id) : null;

            if (!collection && !deck) {
                return res.status(404).json({ error: `${object} not found.` });
            }

            // Attach the object to the request for later use
            req[object] = collection || deck;

            next();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    };
}
