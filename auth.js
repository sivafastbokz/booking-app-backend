const jwt = require('jsonwebtoken')

const jwt_secret = "179839b8b63f7683f9cf72d0b5305ffefbd57636d5d482ef65158e119cc525cc"

const authenticate =(req,res,next)=>{
  try {
     const token = req.headers.authorization.split(' ')[1];
    if(!token){
    return res.status(401).json({error:'unauthroized'})
    }
    const decode = jwt.verify(token, jwt_secret);
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({error:'unauthroized'})
  }
}
module.exports = authenticate;