const mongoose = require('mongoose')


module.exports = mongoose.model( new mongoose.Schema({
    userId:String,
    service:mongoose.Schema.Types.Mixed,
    serviceAd:mongoose.Schema.Types.Mixed,
    design:mongoose.Schema.Types.Mixed
}))