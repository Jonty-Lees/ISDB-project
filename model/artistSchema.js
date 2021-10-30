const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    _id: String,
    Name: String,
    ArtistId: Number
})

const Artists = mongoose.model('Artists', artistSchema)

module.exports = { Artists }