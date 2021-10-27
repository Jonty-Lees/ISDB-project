const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const {User} = require('../modules/userSchema')

const jwtOptions = { secretOrKey: "pa657HI!sna87"};




router.post('/register', (req, res) => {
    if (req.body.username && req.body.password) {
        // check if user exists
        User.findOne({ username: req.body.username },
            function (err, user) {
                if (err) {
                    // send error back
                    res.status(401).json(err);
                } else if (!user) {
                    // create user... note that we are not including the password
                    let newUser = new User({ username: req.body.username });
                    User.register(
                        newUser,
                        req.body.password,
                        function (err) {
                            if (err) {
                                res.status(401).json(err);
                            } else {
                                // no error in registering user
                                res.status(201).json({
                                    message: 'registration successful'
                                });
                            }
                        }
                    )
                } else {
                    res.status(401).json({
                        message: "A user exists with this username"
                    });
                }
            });

    } else {
        res.status(401).json({
            message: "username and password required"
        })
    }
});

router.post('/login', (req, res) => {
    if (req.body.username && req.body.password) {
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
                                message: "login successful",
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
            message: "missing username or password"
        });
    }
});

module.exports = router;