const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const customers =require("./schema");
const customerService = require("./serviveschema");
const customerAppointments = require("./appointmentschema");
const port = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://sivaharshanfastbokz:uoazQaGUCRMUERcC@cluster0.lcmnw6s.mongodb.net/booking_app?retryWrites=true&w=majority",
{
  useNewUrlParser: true,
}
);

app.post('/customersignin',async(req,res)=>{
    const name = req.body.customerName
    const phoneNo = req.body.customerPhoneNo
    const age = req.body.customerAge
    const gender = req.body.customerGender

    const customerDetails = new customers({
        customerName:name,
        customerPhoneNo:phoneNo,
        customerAge:age,
        customerGender:gender
    })
    try {
        await customerDetails.save();
        res.send("data inserted successfully");
    } catch (error) {
        console.log(error)
    }
})

app.post("/services",async(req,res)=>{
    const Name =req.body.serviceName
    const charge = req.body.serviceCharge
    
    const serviceList = new customerService({
        serviceName:Name,
        serviceCharge:charge
    })
    try {
        await serviceList.save();
        res.send("service list inserted successfully")
    } catch (error) {
        console.log(error)
    }
})

app.get("/servicelist",async(req,res)=>{
    try {
        const servicedata = await customerService.find()
        res.json(servicedata)
    } catch (error) {
        console.log(error)
    }
})

app.post("/appointments",async(req,res)=>{
    const bookedby = req.body.appointmentBookedBy
    const bookedfor = req.body.appointmentBookedFor
    const status = req.body.appointmentStatus
    const date = req.body.appointmentDate
    const id = req.body.appointmentId

    const appointmentDetails = new customerAppointments({
        appointmentBookedBy:bookedby,
        appointmentBookedFor:bookedfor,
        appointmentStatus:status,
        appointmentDate:date,
        appointmentId:id
    })
    try {
        await appointmentDetails.save();
        res.send("appointment inserted successfully")
    } catch (error) {
        console.log(error)
    }
})

app.get("/appointmentlist",async(req,res)=>{
    try {
        const appointmentData = await customerAppointments.find()
        res.json(appointmentData)
    } catch (error) {
        console.log(error)
    }
})

app.listen(port,()=>{
    console.log('server is started on port 5000')
})