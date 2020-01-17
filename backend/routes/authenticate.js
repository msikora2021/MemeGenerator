var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var User = require('../models/user');
var router = express.Router();
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';
router.use(cors());
router.post('/', function(req, res) {
    console.log("/ route reached");
    const { email, password } = req.body;
    User.User.findOne({ email }, function(err, user) {
        console.log("findOne reached");
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            console.log(" !user check reached");
            res.status(401)
                .json({
                    error: 'Incorrect email or password'
                });
        } else {
            console.log("first else reached");
            user.isCorrectPassword(password, function(err, same) {
                console.log("check password is reached");
                if (err) {
                    console.log("reached 1");
                    res.status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!same) {
                    console.log("reached 2");
                    res.status(401)
                        .json({
                            error: 'Incorrect email or password'
                        });
                } else {
                    console.log("reached 3");
                    // Issue token
                    const payload = { email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    console.log("reached 4");
                    res.cookie('token', token, { httpOnly: true }).sendStatus(200);
                }
            });
        }
    });
});
module.exports = router;