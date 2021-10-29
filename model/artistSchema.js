const mongoose = require('mongoose');


let artistSchema = new mongoose.Schema({
    ArtistId: Number,
    Name: String
})

const Artists = mongoose.model("Artists", artistSchema)

module.export = { Artists }