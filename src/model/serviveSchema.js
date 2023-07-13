const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    serviceName:{
        type:String,
        required:true
    },
    serviceCharge:{
        type:Number,
        required:true
    }
})

const services = mongoose.model('servicelist',ServiceSchema)
module.exports = services