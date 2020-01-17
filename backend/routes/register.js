var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user');
var router = express.Router();


    router.post('/', (req, res) => {
        console.log("register route reached");
        console.log(req.body.username);
        const { email, username, password } = req.body;
        const user = new User.User({ email, username, password });
        user.save(function(err) {
            console.log("User save function reached");
            if (err) {
                console.log(err);
                console.log("error thing reached");
                res.status(500).send(err);

            } else {
                console.log("else statement reached");
                res.status(200).send("User succesfully registered");
            }
        });
    });
module.exports = router;
