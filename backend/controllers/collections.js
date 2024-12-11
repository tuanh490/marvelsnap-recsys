import Collection from "../models/Collection.js"
import mongoose from "mongoose";

export async function getCollection(req, res) {
    const collection = await Collection.findById(req.params.id)
        .populate('user', 'cards')

    res.json(collection)
}

export async function toggleCardInCollection(req, res) {
    const collectionId = req.params.id;
    const { cardId } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(collectionId) || !mongoose.Types.ObjectId.isValid(cardId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const collection = await Collection.findById(collectionId);

        if (!collection) {
            return res.status(404).json({ error: 'Collection not found' });
        }

        if (collection.cards.includes(cardId)) {
            collection.cards.pull(cardId);
            await collection.save();
            return res.json({ message: 'Card removed from collection', collection });
        } else {
            collection.cards.push(cardId);
            await collection.save();
            return res.json({ message: 'Card added to collection', collection });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update collection', details: error.message });
    }
}
