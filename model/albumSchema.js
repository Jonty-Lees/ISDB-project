const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    AlbumId: Number,
    Title: String,
    ArtistId: Number
})

const Albums = mongoose.model('Albums', albumSchema)

module.exports = { Albums }