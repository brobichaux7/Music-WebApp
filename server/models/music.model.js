const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
    rating: {
        type: Number
    },
    listened: {
        type: Boolean
    }
}, { timestamps: true });

const Music = mongoose.model('Music', MusicSchema);