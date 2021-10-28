const express = require('express');
const musicRouter = express.Router();

const { Track } = require('../modules/trackSchema')


//  /tracks/:id   GET  all information about specific track, genre and album info

musicRouter.get('/tracks/:id', passport.authenticate("jwt", 
                { session: false }), 
                async function (req, res){   
                        const track = await Track.findOne({_id:req.params.id});
                        return res.json(track);

                });


            


//  /genres   GET   all genres(as an array)




// albums/:id   GET   All info about the specific album, including artist info

musicRouter.get('/albums/:id', passport.authenticate("jwt", 
                { session: false }), 
                async function (req, res){   
                        const track = await Track.findOne({_id:req.params.id});
                        return res.json(track);

                });



// /artists/:id    GET    All info about the specific artist




//  /tracks    POST     you can add Name, album id, Genre id, composer, furation, size in byte and prices.  
// Json message with created record or proper eroor message. Album and Genre have to exist already












module.exports = musicRouter;