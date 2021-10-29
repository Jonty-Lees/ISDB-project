const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    Name: String,
    ArtistId: Number
})

const Artists = mongoose.model('Artists', artistSchema)

module.exports = { Artists }