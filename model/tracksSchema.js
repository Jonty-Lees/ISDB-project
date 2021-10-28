const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    Name: String,
})

const Tracks = mongoose.model('Tracks', trackSchema)

module.exports = { Tracks }