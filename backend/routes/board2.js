var express = require('express');
var mongoose = require('mongoose');
var meme = require("../models/meme");
var router = express.Router();


router.post('/', (req, res) => {
    console.log("reached the router board2 function");
    var imagestring = req.body.imgstring;
    var imagetoBuffer = Buffer.from(imagestring, "base64");
    var doc = new meme.Meme({ img: imagetoBuffer, caption: req.body.rightsidecaption, tags: req.body.rightsidetags});
    doc.save();
    console.log(doc.img)
    var query = meme.Meme.find({ 'caption': 'When you’re at the store and you see someone paying for movies' });
    query.select('img');
    query.exec(function (err, athletes) {
        if (err) return console.log(err);
        console.log(athletes);
        // athletes contains an ordered list of 5 athletes who play Tennis
    })
});
module.exports = router;