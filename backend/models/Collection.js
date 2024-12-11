import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card',
        default: []
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default mongoose.model('Collection', CollectionSchema);
