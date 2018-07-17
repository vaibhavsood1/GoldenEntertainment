var express = require("express");
var app  = express();
var request = require("request");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var Message = require("./models/message.js");
var nodemailer = require('nodemailer');
 var mailgun = require("mailgun");

mongoose.connect('mongodb://localhost:27017/yelp_camp',{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.get("/",function(req,res){
    res.render("homepage.ejs");
})
app.get("/message",function(req, res) {
    res.render("message.ejs");
})
app.get("/about",function(req,res){
    res.send("About.hmtl");
})

app.post("/message",function(req,res){
   
    var msg = {
        name:req.body.name,
        message:req.body.message
        
    }
    Message.create(msg,function(err,camp){
        if(err){
            console.log("error!")
        }else{
            console.log(camp)
           
            res.redirect("/");
            
        }
    })
    

    
    
});



app.listen(process.env.PORT,process.env.IP);


