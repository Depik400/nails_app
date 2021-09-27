const mongoose = require("mongoose");

module.exports = mongoose.model("serviceAd", new mongoose.Schema({
    id:Number,
    description:String,
    price:Number,
    count:Number,
    isSelected:Boolean,
    isNumerable:Boolean
}));