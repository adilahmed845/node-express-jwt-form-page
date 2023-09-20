const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bycrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Please Enter a email address"],
        unique:true,
        lowercase:true,
        validate:[isEmail, "Enter a valid email"]
    },
    password:{
        type:String,
        required:[true, "Please Enter a password"],
        minlength: [6, "Minimum password length is 6"]
    },
})

//mongoose hooks
//fire a function after doc is saved to db 
// userSchema.post('save',function(doc,next){
//     console.log("user is created and saved", doc);
//     next();
// })

//fire a function before doc is saved to db
// userSchema.pre('save',function(next){
//     console.log("user is about to create", this);
//     next();
// })

//password hashing
userSchema.pre('save',async function(next){
    const salt = await bycrypt.genSalt();
    this.password = await bycrypt.hash(this.password,salt);
    next();
})

const User = mongoose.model("user", userSchema);

module.exports = User;