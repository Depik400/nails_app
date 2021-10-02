const mongo = require('mongoose');


module.exports = mongo.model("user", mongo.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    login:{
        type:String,
        required:true,
        unique:true
    },
    pass:String
}))