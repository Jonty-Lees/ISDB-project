const express = require('express');
const router = express.Router();
const passport = require('passport')

const { Tracks } = require('../model/tracksSchema')
const { Genres } = require('../model/genresSchema')
const { Albums } = require('../model/albumSchema')
const { Artists } = require('../model/artistSchema');



//  /tracks/:id   GET  all information about specific track, genre and album info



router.get('/tracks/:id', passport.authenticate("jwt",
    { session: false }),
    async function (req, res) {
        console.log(req.params.id)
        const track = await Tracks.aggregate([
            {
                $match: {
                    "TrackId": parseInt(req.params.id, 10)
                }
            },
            {
                $lookup: {
                    from: "albums",
                    localField: "AlbumId",
                    foreignField: "AlbumId",
                    as: "Album"
                }
            },
            {
                $lookup: {
                    from: "genres",
                    localField: "GenreId",
                    foreignField: "GenreId",
                    as: "Genre"
                }
            }
        ])
        return res.json(track)
    });


// Working!
//    db.tracks.aggregate([ {$match: {TrackId: 4}}, {   $lookup: {from:"albums", localField:"AlbumId", foreignField:"AlbumId", as: "Album"} }, { $lookup: {from:"genres", localField: "GenreId", foreignField: "GenreId", as: "Genre" }} ] )



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
        const album = await Albums.findOne({ _id: req.params.id })
        return res.json(album)
    });



// /artists/:id    GET    All info about the specific artist

router.get('/artists/:id', passport.authenticate("jwt",
    { session: false }),
    async function (req, res) {
        const artist = await Artists.find({ _id: req.params.id })
        return res.json(artist)
    }
)


//  /tracks    POST     yorsu can add Name, album id, Genre id, composer, furation, size in byte and prices.  
// Json message with created record or proper error message. Album and Genre have to exist already



// router.post('/tracks', async function (req, res) {
//     // check if the genre and Alumid already exist
//     // if so they can create track

//     // if not send error
//     const genre = req.body.genre;
//     const albumId = req.body.albumId



// })
// try {
//     await track.save()
//     res.status(201).send(track)
// } catch (err) {
//     res.status(400).json({ message: err.message })
// }
// });



module.exports = router;



// router.post('/tracks', async function (req, res) {
//     const track = new Tracks({
//         Name: req.body.Name,
//         AlbumId: req.body.AlbumId,
//         GenreId: req.body.GenreId,
//         Composer: req.body.Composer,
//         Milliseconds: req.body.Milliseconds,
//         Bytes: req.body.Bytes,
//         UnitPrice: req.body.UnitPrice
//     })
//     try {
//         await track.save()
//         res.status(201).send(track)
//     } catch (err) {
//         res.status(400).json({ message: err.message })
//     }
// });
