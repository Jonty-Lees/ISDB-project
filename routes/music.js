const express = require('express');
const router = express.Router();
const passport = require('passport')

const { Tracks } = require('../model/tracksSchema')


//  /tracks/:id   GET  all information about specific track, genre and album info

router.get('/tracks/:id', passport.authenticate("jwt",
    { session: false }),
    async function (req, res) {
        const track = await Tracks.findOne({ _id: req.params.id },{Name:1, AlbumId:1});
        return res.json(track);

    });





//  /genres   GET   all genres(as an array)




// albums/:id   GET   All info about the specific album, including artist info

router.get('/albums/:id', passport.authenticate("jwt",
    { session: false }),
    async function (req, res) {
        const track = await Track.findOne({ _id: req.params.id });
        return res.json(track);

    });



// /artists/:id    GET    All info about the specific artist




//  /tracks    POST     you can add Name, album id, Genre id, composer, furation, size in byte and prices.  
// Json message with created record or proper eroor message. Album and Genre have to exist already












module.exports = router;