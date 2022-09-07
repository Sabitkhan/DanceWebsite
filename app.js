const express=require('express');
const path = require('path');
const fs = require('fs');
const bodyparser = require("body-parser");
const app =express();
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/contactDance', {useNewUrlParser:true});

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
      
  });

var contact = mongoose.model('contact',contactSchema);

app.use("/static",express.static('static'));
app.use(express.urlencoded());

app.set("views engine","pug");
app.set('views',path.join(__dirname,'views'));

app.get("/",function(req,res){
    const params={};
    res.status(200).render("home.pug",params);
})
app.get("/contact",(req,res)=>{
    const params={};
    res.status(200).render("contact.pug",params)
})
app.post('/contact',(req,res)=>{
   var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("Your data has been saved Successfuly")
        }).catch(()=>{
        res.status(400).send("no items found")

    });
});

app.listen(3000,function(){
    console.log("Server is runing on port 3000");
}); 