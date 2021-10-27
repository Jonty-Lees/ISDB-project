const mongoose = require('mongoose');


let trackSchema = new mongoose.Schema({

    Name: String,
    AlbumId: {
        type: String,
        unique: false
    },
    GenreId: {
        type: Number,
        unique: false
    },
    Composer: String,
    Milliseconds: Number,
    Bytes: Number,
    UnitPrice: Number,

})

const Track = mongoose.model('Track', trackSchema)

module.export = { Track };
