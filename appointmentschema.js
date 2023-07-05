var mongoose = require('mongoose');

var AppointmentSchema = new mongoose.Schema({
    appointmentBookedFor:{
        type:String,
        required:true
    },
    appointmentDate:{
        type:Date,
        required:true
    },
   
})

 const appointments = mongoose.model("appointmentdatas",AppointmentSchema)
 module.exports = appointments