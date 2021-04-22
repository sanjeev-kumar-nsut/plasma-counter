//FOR DOTENV
require('dotenv').config()

//FOR EXPRESS
const express = require('express');
const app = express();

//FOR EJS
const path = require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))

//PUBLIC
app.use(express.static('public'))

//FOR BODY PARSER
const bodyParser = require('body-parser')
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
//FOR MONGOOSE
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify:false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MONGODB WORKING");
});

const User = require('./models/user');

app.get('/',(req,res)=>{
    res.render('home');
})
app.post('/',async(req,res)=>{
    const newuser = new User(req.body);
    await newuser.save();
    console.log(req.body);
    res.redirect('/');
})
app.get('/request',async(req,res)=>{
    const alluser = await User.find();
    res.render('request',{alluser});
})
app.get('/add',(req,res)=>{
    res.render('adduser');
})
app.get('/donate',async(req,res)=> {
    const alluser = await User.find();
    res.render('donate',{alluser});
})
app.get('/contact',(req,res)=>{
    res.render('contact');
})

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("APP is listening in port 3000");
})