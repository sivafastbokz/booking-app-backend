var mongoose = require('mongoose');

var AppointmentSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    appointmentBookedFor:{
        type:String,
        required:true
    },
    appointmentDate:{
        type:String,
        required:true
    },
})

 const appointments = mongoose.model("appointmentdatas",AppointmentSchema)
 module.exports = appointments