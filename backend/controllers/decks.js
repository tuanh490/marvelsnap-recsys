import Deck from '../models/Deck.js';

export async function getAllDecks(req, res) {
    const decks = await Deck.find({ user: req.user._id })
        .populate('cards');

    res.json(decks);
}

export async function getDeck(req, res) {
    const deck = await Deck.findById(req.params.id)
        .populate('cards');

    res.json(deck);
}

export async function createDeck(req, res) {
    try {
        const deck = new Deck(req.body);
        deck.user = req.user._id;

        await deck.save();

        res.status(201).json(deck);
    } catch (err) {
        if (err.errors && err.errors.cards)
            res.status(400).json({ message: err.errors.cards.message });

        if (err.errors) {
            const errorMessages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ message: errorMessages.join(', ') });
        }

        console.error(err);
        res.status(500).json({ message: 'An unexpected error occurred.' });
    }
}

export async function updateDeck(req, res) {
    try {
        const { id } = req.params;
        const deck = await Deck.findByIdAndUpdate(id, { ...req.body }, { runValidators: true, new: true });
        res.json(deck);
    } catch (err) {
        if (err.errors && err.errors.cards)
            res.status(400).json({ message: err.errors.cards.message });
    }
}

export async function deleteDeck(req, res) {
    const { id } = req.params;
    await Deck.findByIdAndDelete(id);
    res.json({ message: 'Deck deleted successfully' });
}