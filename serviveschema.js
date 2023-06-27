var mongoose = require('mongoose');

var ServiceSchema = new mongoose.Schema({
    serviceName:{
        type:String,
        required:true
    },
    serviceCharge:{
        type:Number,
        required:true
    }
})

const services = mongoose.model("servicelist",ServiceSchema)
module.exports = services