const express = require ('express');
const jwt = requre('jsonwebtoken');
const mongoose = require('mongoose');

const passport = require('passport');
const passportJWT = require("passport-jwt");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express()
const port = 3000;










// app.get('/', function (req, res){
//     res.send("HELLO WORLD!")
// })


app.listen(path, ()=>{
    console.log(`You are listening on port: ${port}`)
})
