const jwt = require('jsonwebtoken');
const User = require('../models/User')

const requireAuth = (req,res,next) => {
 const token = req.cookies.jwt
 if(token){
    jwt.verify(token,'secret key',(error,decoded)=>{
        if(error){
            console.log(error.message);
            res.redirect('/login');
        }
        else{
            console.log(decoded);
            next();
        }
    })

 }
 else{
    res.redirect('/login');
 }
}

// check current user

const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt
 if(token){
    jwt.verify(token,'secret key',async (error,decoded)=>{
        if(error){
            console.log(error.message);
            res.locals.user = null
            next();
        }
        else{
            let user = await User.findById(decoded.id);
            res.locals.user = user;
            next();
        }
    })

 }
 else{
    res.locals.user = null
    next();
 }
}
module.exports = {requireAuth, checkUser};