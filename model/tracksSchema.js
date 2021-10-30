const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    Name: String,
    AlbumId: {
        type: Number,
    },
    TrackId: Number,
    MediaTypeId: Number,
    GenreId: {
        type: Number
    },
    Composer: String,
    Milliseconds: Number,
    Bytes: Number,
    UnitPrice: Number
})

const Tracks = mongoose.model('Tracks', trackSchema)

module.exports = { Tracks }