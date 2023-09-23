const User = require('../models/User');
const jwt = require('jsonwebtoken');

//handle error
const handleError = (err) =>{
    console.log(err.message,err.code);
    let errors = {email:"",password:""};

    //incorrect email
    if(err.message === 'incorrect email'){
        errors.email = "email is not registered"
    }

    //incorrect password
    if(err.message === 'incorrect password'){
        errors.password = "wrong password"
    }
    
    //duplicate error 
    if(err.code === 11000){
        errors.email = "email already existed"
        return errors
    }

    //validation error
    if(err.message.includes('user validation failed'))
    {   
        Object.values(err.errors).forEach(({properties}) => {
            //console.log(error.properties.path)
            errors[properties.path] = properties.message
        });
    }

    return errors;
} 

const maxAge = 3*24*60*60;
//token function
const createToken = (id) => {
   return jwt.sign({id},'secret key',{
        expiresIn:maxAge,
    })
}

module.exports.getSignup = (req,res) =>{
    res.render('signup');
}

module.exports.getLogin = (req,res) =>{
    res.render('login');
}

module.exports.postSignup = async (req,res) =>{
    const {email,password} = req.body;
    try{
       const user = await User.create({email,password});
       const token = createToken(user._id)
       console.log(token);
       res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
       res.status(201).json({user:user._id});
    }
    catch(err){
        const errors = handleError(err);
        res.status(400).json({errors})
    }
}

module.exports.postLogin= async (req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await User.login(email,password);
        const token = createToken(user._id)
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(201).json({user: user._id});

    }
    catch(err){
        const errors = handleError(err);
        console.log(errors);
        res.status(400).json({errors});
    }
}