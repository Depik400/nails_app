const mongoose = require('mongoose')


module.exports = mongoose.model("userServices",new mongoose.Schema({
    userId:String,
    date: mongoose.Schema.Types.Mixed,
    service:mongoose.Schema.Types.Mixed,
    serviceAd:mongoose.Schema.Types.Mixed,
    design:mongoose.Schema.Types.Mixed
}))