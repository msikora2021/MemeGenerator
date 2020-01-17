var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var memeschema = new Schema(
    {
        img: Buffer,
        caption: {type: String, required: true, max: 50},
        tags: [String],
        date: { type: Date, default: Date.now },
        imagestring: {type: String}
    }
);
var Meme = mongoose.model('Meme',memeschema);
module.exports = { Meme };