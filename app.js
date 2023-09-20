const express = require('express');
const mongoose = require('mongoose');

const app = express();

const authRoutes = require("./routes/authRoute");
const cookieParser = require('cookie-parser');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://adilahmed845:vqTUfzFkB3ld0MGD@cluster1.em1qvrw.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

//cookies
// app.get('/set-cookies',(req,res)=>{
//   //res.setHeader("Set-Cookie", 'newUser=true');

//   //cookie method comes with cookieParser middleware
//   res.cookie('isEmployee',true,{maxAge:1000*60*60*24, httpOnly:true})
//   res.cookie("todayUser",false);

//   res.send("cookie is updated ")
// })

// app.get('/read-cookies',(req,res)=>{
//   const cookies = req.cookies;
  
//   console.log(cookies);

//   res.json(cookies)
// })


