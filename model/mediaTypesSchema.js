const mongoose = require('mongoose');

const mediaTypesSchema = new mongoose.Schema({
    MediaTypeId: Number,
    Name: String
})

const Media_Types = mongoose.model('Media_Types', mediaTypesSchema)

module.exports = { Media_Types }