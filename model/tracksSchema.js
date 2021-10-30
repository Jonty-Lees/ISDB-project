const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    Name: String,
    AlbumId: {
        type: Number,
        unique: false
    },
    TrackId: Number,
    MediaTypeId: Number,
    GenreId: {
        type: Number,
        unique: false
    },
    Composer: String,
    Milliseconds: Number,
    Bytes: Number,
    UnitPrice: Number
})

const Tracks = mongoose.model('Tracks', trackSchema)

module.exports = { Tracks }