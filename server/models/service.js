const mongoose = require("mongoose");

module.exports = mongoose.model("service", new mongoose.Schema({
    id:Number,
    description:String,
    alternativeDescription:String,
    price:Number,
    isSelected:Boolean,
}));