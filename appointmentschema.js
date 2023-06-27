var mongoose = require('mongoose');


var AppointmentSchema = new mongoose.Schema({
    appointmentBookedBy:{
        type:String,
        required:true
    },
    appointmentBookedFor:{
        type:String,
        required:true
    },
    appointmentStatus:{
        type:String,
        required:true
    },
    appointmentDate:{
        type:Date,
        required:true
    },
    appointmentId:{
        type:Number,
        required:true
    }
})

 const appointments = mongoose.model("appointmentdatas",AppointmentSchema)
 module.exports = appointments