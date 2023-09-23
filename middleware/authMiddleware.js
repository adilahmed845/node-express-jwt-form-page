const jwt = require('jsonwebtoken');

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

module.exports = {requireAuth};