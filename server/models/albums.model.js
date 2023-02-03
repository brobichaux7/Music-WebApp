const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    artist: {
        type: String,
        required: true
    },
    albumCover: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Album', AlbumSchema);