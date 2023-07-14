const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express(); 
const customers =require('./model/schema');
const customerService = require('./model/serviveSchema');
const customerAppointments = require('./model/appointmentSchema');
const authenticate = require('../auth')
const serverConfig = require('./serverConfig');

app.use(express.json());
app.use(cors());

mongoose.connect(serverConfig.mongooseurl,{useNewUrlParser: true,});

app.post('/customersignin',async(req,res)=>{

    const{customerName,customerPhoneNo,customerAge,customerGender,customerPassword} = req.body

    try {
       const oldCustomer = await customers.findOne({customerName:customerName})
       if(oldCustomer){
         return res.send('user name already exists')
       }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(customerPassword, salt);
        const customerDetails = new customers({
        customerName:customerName,
        customerPhoneNo:customerPhoneNo,
        customerAge:customerAge,
        customerGender:customerGender,
        customerPassword:hashedPassword,  
    })
        await customerDetails.save();
        res.send('data inserted successfully');
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
})

app.get('/customerlist',async(req,res)=>{
    try {
        const customerdata = await customers.find()
        res.json(customerdata)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
    

})

app.post('/services',async(req,res)=>{
   const{serviceName,serviceCharge}=req.body
    
    const serviceList = new customerService({
        serviceName:serviceName,
        serviceCharge:serviceCharge
    })
    try {
        await serviceList.save();
        res.send('service list inserted successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
})

app.get('/servicelist',async(req,res)=>{
    try {
        const servicedata = await customerService.find()
        res.json(servicedata)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
})

app.get('/servicelist/:name',async(req,res)=>{
    try {
        const servicelist = await customerService.find({
            "$or":[
                {
                    serviceName:{$regex:req.params.name}
                }
            ]
        })
        res.json(servicelist)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})

app.post('/appointments',authenticate,async(req,res)=>{
    const userId = req.userId
    const bookedfor =req.body.appointmentBookedFor
    const date = req.body.appointmentDate
  
    const appointmentDetails = new customerAppointments({
        userId:userId,
        appointmentBookedFor:bookedfor,
        appointmentDate:date,
        
    })
    try {
        await appointmentDetails.save();
        res.send('appointment inserted successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
})

app.get('/appointmentlist',authenticate,async(req,res)=>{
    try {
        const userId = req.userId 
        const appointmentData = await customerAppointments.find({userId:userId})
        res.json(appointmentData)
    } catch (error) {
        console.log(error)
    }
})

app.post('/customerlogin',async(req,res)=>{
    const{customerName,customerPassword}=req.body
    try {
        const user = await customers.findOne({ customerName:customerName });
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }
    const isMatch = await bcrypt.compare(customerPassword, user.customerPassword);
    const token = jwt.sign({userId:user._id},serverConfig.jwt_sercretKey)
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

app.listen(serverConfig.port,()=>{
    console.log('server is started on port 5000')
})

