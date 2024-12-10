import mongoose from "mongoose";
import CardSchema from "./Card";

const Schema = mongoose.Schema;

const CollectionSChema = new Schema({
    cards: [CardSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default mongoose.model('Collection', CollectionSChema)