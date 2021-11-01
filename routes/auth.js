// add consts require
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

// import User

const {User} = require('../model/userSchema.js')

// add the jwtOptions with secret or key password

const jwtOptions = { secretOrKey: "pa657HI!sna87"};


// /register - this is to add a new user


router.post('/register', (req, res) => {
    if (req.body.username && req.body.password) {
        // check if user exists, they do search 
        User.findOne({ username: req.body.username },
            function (err, user) {
                if (err) {
                    // send error back
                    res.status(401).json(err);
                } else if (!user) {
                    // create user but do not add the password
                    let newUser = new User({ username: req.body.username });
                    User.register(
                        newUser,
                        req.body.password,
                        function (err) {
                            if (err) {
                                res.status(401).json(err);
                            } else {
                                // if no error show message
                                res.status(201).json({
                                    message: 'Registration Successful!! Enjoy ISDB'
                                });
                            }
                        }
                    )
                } else {
                    res.status(401).json({
                        message: "A User already exists with this username"
                    });
                }
            });

    } else {
        res.status(401).json({
            message: "Please enter username and password"
        })
    }
});


// Create a POST '/login', 

router.post('/login', (req, res) => {
    if (req.body.username && req.body.password) {
        // check to see if user exists
        //  create const for username and password
        const username = req.body.username;
        const password = req.body.password;
        User.findOne({ username: username },
            function (err, user) {

                if (err) {
                    res.status(401).json(err);
                } else if (!user) {
                    res.status(401).json({
                        message: "User not registered"
                    });
                }
                user.authenticate(
                    password,
                    function (err, user) {

                        if (err) {
                            res.status(401).json(err);
                        }
                        if (user) {
                            // pass jwt token
                            const payload = { id: user.id };
                            const token = jwt.sign(payload, jwtOptions.secretOrKey);

                            res.status(200).json({
                                message: "Login Successful!!",
                                token: token
                            });
                        } else {
                            res.status(401).json({
                                message: "Invalid password"
                            });
                        }
                    })

            });
    } else {
        res.status(401).json({
            message: "Incorrect username or password"
        });
    }
});

module.exports = router;