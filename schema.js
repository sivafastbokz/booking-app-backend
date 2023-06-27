var mongoose = require('mongoose');
 
var CustomerSchema = new mongoose.Schema({
    customerName:{
        type:String,
        required:true
    },
    customerPhoneNo:{
        type:Number,
        required:true
    },
    customerAge:{
        type:Number,
        required:true
    },
    customerGender:{
        type:String,
        required:true
    }
})

const users = mongoose.model("customerdatas",CustomerSchema)
module.exports = users
