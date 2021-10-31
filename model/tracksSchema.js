const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    AlbumId: {
        type: Number,
        required: true,
        min: [1, "Only tracks that belong to pre-existing albums can be added"],
        max: [347, "Only tracks that belong to pre-existing albums can be added"]
    },
    TrackId: Number,
    MediaTypeId: Number,
    GenreId: {
        type: Number,
        required: true,
        min: [1, "Please enter a pre-defined genre between 1-25"],
        max: [25, "Please enter a pre-defined genre between 1-25"]
    },
    Composer: String,
    Milliseconds: Number,
    Bytes: Number,
    UnitPrice: Number
})

const Tracks = mongoose.model('Tracks', trackSchema)

module.exports = { Tracks }