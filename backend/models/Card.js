import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    power: {
        type: Number,
        required: true
    },
    ability: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: true
    },
    art: {
        type: String,
        required: true
    }
})

export default mongoose.model('Card', CardSchema)