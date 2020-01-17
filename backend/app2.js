var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var meme = require("../backend/models/meme");
var User = require('../backend/models/user');
var board = require('../backend/routes/board');
var board2 = require('../backend/routes/board2');
var register = require('../backend/routes/register');
var login = require('../backend/routes/authenticate');
const cookieParser = require('cookie-parser');
var withAuth  = require('../backend/controllers/middleware');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var mongoDB = 'mongodb+srv://msikora3:test123@cluster0-2c1do.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cookieParser());
app.use('/board', board);
app.use('/board2', board2);
app.use('/register', register);
app.post('/shit', (req,res) => {
    console.log("Shit logger reached");
    res.status(200).send("Shit route reached");
    console.log(res.body);

});
app.use('/login', login);
app.post('/search', (req,res) => {
    console.log("search route reached");
    let searchTagArray = req.body.searchArray
    console.log("Below me is the search tag array");
    console.log(req.body.searchTagArray);
    var queryParams = { tags: { $in: searchTagArray } }
    meme.Meme.find(queryParams).sort('-date').exec(function(err, docs) {
        console.log("exec function reached");
        if(err) {
            console.log("There's an error with search");
            console.log(err);
            return res.status(500).send(err);
        } else {
            console.log(docs);
            console.log("Search request Successful");
            return res.status(200).send(docs);
        }
    });
});
app.get('/memeboard',  (req, res) => {
    //console.log("Ok so like im reached");
    meme.Meme.find({}).sort('-date').exec(function(err, docs) {
        if(err) {
            console.log(err);
            return res.status(500).send(err);
        } else {
            return res.status(200).send(docs);
        }
    });
});
app.listen(8000, console.log("server be up and runnin"));