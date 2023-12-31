const mongoose = require('mongoose');
 
const CustomerSchema = new mongoose.Schema({
    customerName:{
        type:String,
        required:true
    },
    customerPhoneNo:{
        type:String,
        required:true
    },
    customerAge:{
        type:Number,
        required:true
    },
    customerGender:{
        type:String,
        required:true
    },
    customerPassword:{
        type:String,
        required:true
    },
})

const users = mongoose.model('customerdatas',CustomerSchema)
module.exports = users
