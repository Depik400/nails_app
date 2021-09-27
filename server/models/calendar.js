const mongoose = require("mongoose");

module.exports = mongoose.model("calendar", new mongoose.Schema({
    id:Number,
    month:String,
    day:Number,
    hour: String,
    isSelected:Boolean
}));
