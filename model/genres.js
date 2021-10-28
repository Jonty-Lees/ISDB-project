const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    GenreId: Number,
    Name: String
})

const Genres = mongoose.model('Genres', genreSchema)

module.exports = { Genres }