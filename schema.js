var mongoose = require('mongoose');
 
var CustomerSchema = new mongoose.Schema({
    customerName:{
        type:String,
        unique:true,
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
    }
})

const users = mongoose.model("customerdatas",CustomerSchema)
module.exports = users
