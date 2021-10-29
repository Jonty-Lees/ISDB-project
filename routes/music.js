const express = require('express');
const router = express.Router();
const passport = require('passport')

const { Tracks } = require('../model/tracksSchema')
const { Genres } = require('../model/genresSchema')
const { Albums } = require('../model/albumSchema')


//  /tracks/:id   GET  all information about specific track, genre and album info

router.get('/tracks/:id', passport.authenticate("jwt",
    { session: false }),
    async function (req, res) {
        const track = await Tracks.findOne({ TrackId: req.params.id }
        [{
                $lookup: {
                    from: Albums,
                    localField: Tracks.AlbumId,
                    foreignField: Albums.AlbumId,
                    as: "albumInfo",
                }
            }])
        return res.json(track)
    });





//  /genres   GET   all genres(as an array)

router.get('/genres',
    passport.authenticate("jwt",
        { session: false }),
    async function (req, res) {
        const genres = await Genres.aggregate(
            [{
                $project:
                {
                    _id: 0,
                    Name: 1,
                    GenreId: 1
                }
            }
            ]).sort(
                { GenreId: 1 }
            )
        return res.json(genres)
    })




// albums/:id   GET   All info about the specific album, including artist info

router.get('/albums/:id', passport.authenticate("jwt",
    { session: false }),
    async function (req, res) {
        const album = await Albums.find({ _id: req.params.id })
        return res.json(album)
    });



// /artists/:id    GET    All info about the specific artist




//  /tracks    POST     yorsu can add Name, album id, Genre id, composer, furation, size in byte and prices.  
// Json message with created record or proper eroor message. Album and Genre have to exist already












module.exports = router;