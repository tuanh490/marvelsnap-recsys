import mongoose, { mongo } from "mongoose";
import CardSchema from "./Card";

const Schema = mongoose.Schema;

const DeckSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cards: [CardSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model('Deck', DeckSchema)