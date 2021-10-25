const express = require('express');
const jwt = requre('jsonwebtoken');
const mongoose = require('mongoose');

const passport = require('passport');
const passportJWT = require("passport-jwt");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express()
const port = 3000;

// import the middleware
require('./middleware/auth');


// connect up mongoose
mongoose.connect("mongod://127.0.0.1/isdb_auth");

// const app.use
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

// utilise router
app.use("/api", authRoute);
app.use("/api", albumsRoute)

// add the swagger UI

// test with app.get secret







// app.get('/', function (req, res){
//     res.send("HELLO WORLD!")
// })


app.listen(path, () => {
    console.log(`You are listening on port: ${port}`)
})
