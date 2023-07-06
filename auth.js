const jwt = require('jsonwebtoken')

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGE2YjkwMjQzNTM4NGIxYWYyNDMzOGYiLCJzZXNzaW9uSWQiOiJiYTJkMGUyNy1hODU1LTRmN2ItYTI0Ny0yNDU0YTM5ZmM2NTMiLCJpYXQiOjE2ODg2NDc5NTJ9.45yrGPFF4ePAcT4wwdENb8WG67seINLEy72byINTjpA'
const jwt_secret = "179839b8b63f7683f9cf72d0b5305ffefbd57636d5d482ef65158e119cc525cc"

const authenticate =(req,res,next)=>{
  try {
     const token = req.headers.authorization?.split(' ')[1];
    if(!token){
    return res.status(401).json({error:'unauthroized'})
    }
    const decode = jwt.verify(token, jwt_secret);
     console.log(token,jwt_secret,decode,'siva')
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({error:'unauthroized'})
  }
}
module.exports = authenticate;