import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const DeckSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: String,
    cards: {
        type: [Schema.Types.ObjectId],
        ref: 'Card',
        required: true,
        validate: {
            validator: function (cards) {
                // Ensure the deck has exactly 12 cards
                if (cards.length !== 12) {
                    return false;
                }

                // Ensure all cards are unique
                const uniqueCards = new Set(cards.map(card => card.toString()));
                return uniqueCards.size === cards.length;
            },
            message: 'A deck must have exactly 12 unique cards.',
        },
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export default mongoose.model('Deck', DeckSchema)