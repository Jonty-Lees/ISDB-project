const express = require('express');
const musicRouter = express.Router();


//  /tracks/:id   GET  all information about specific track, genre and album info




//  /genres   GET   all genres(as an array)




// albums/:id   GET   All info about the specific album, including artist info




// /artists/:id    GET    All info about the specific artist




//  /tracks    POST     you can add Name, album id, Genre id, composer, furation, size in byte and prices.  
// Json message with created record or proper eroor message. Album and Genre have to exist already












module.exports = musicRouter;