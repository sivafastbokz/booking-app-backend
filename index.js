const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require("uuid")
const app = express(); 
const customers =require("./schema");
const customerService = require("./serviveschema");
const customerAppointments = require("./appointmentschema");
const authenticate = require('./auth')
const port = 5000;

app.use(express.json());
app.use(cors());

const jwt_secret = "179839b8b63f7683f9cf72d0b5305ffefbd57636d5d482ef65158e119cc525cc"

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
    const password = req.body.customerPassword
    try {
       const oldCustomer = await customers.findOne({customerName:name})
       if(oldCustomer){
         return res.send("user name already exists")
       }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const customerDetails = new customers({
        customerName:name,
        customerPhoneNo:phoneNo,
        customerAge:age,
        customerGender:gender,
        customerPassword:hashedPassword,  
    })
        await customerDetails.save();
        res.send("data inserted successfully");
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
})

app.get("/customerlist",async(req,res)=>{
    try {
        const customerdata = await customers.find()
        res.json(customerdata)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
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
        res.status(500).send('Internal server error');
    }
})

app.get("/servicelist",async(req,res)=>{
    try {
        const servicedata = await customerService.find()
        res.json(servicedata)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
})

app.post("/appointments",authenticate,async(req,res)=>{
    const userId = req.userId
    const bookedfor = req.body.appointmentBookedFor
    const date = req.body.appointmentDate
  
    const appointmentDetails = new customerAppointments({
        userId:userId,
        appointmentBookedFor:bookedfor,
        appointmentDate:date,
        
    })
    try {
        await appointmentDetails.save();
        res.send("appointment inserted successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
})

app.get("/appointmentlist",authenticate,async(req,res)=>{
    try {
        const userId = req.userId 
        const appointmentData = await customerAppointments.find({userId:userId})
        res.json(appointmentData)
    } catch (error) {
        console.log(error)
    }
})

app.post("/customerlogin",async(req,res)=>{
    const name = req.body.customerName
    const password = req.body.customerPassword
    try {
        const user = await customers.findOne({ customerName:name });
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }
    const isMatch = await bcrypt.compare(password, user.customerPassword);
    // const sessionId = uuidv4();
    const token = jwt.sign({userId:user._id},jwt_secret)
    if (!isMatch) {
      return res.status(401).send('Invalid username or password');
    }
    if(res.status(200)){
        return res.json({ status:'loged in sucessfully',data:token})
    }
    } catch (error) {
        console.log(error)
    }
})

app.listen(port,()=>{
    console.log('server is started on port 5000')
})

