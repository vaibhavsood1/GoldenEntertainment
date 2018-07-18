var express = require("express");
var app  = express();
var request = require("request");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var Message = require("./models/message.js");
var passedMsg = {};

mongoose.connect('mongodb://localhost:27017/golden_enter',{ useNewUrlParser: true });






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
        phone:req.body.phone,
        message:req.body.message
        
    }
    
    Message.create(msg,function(err,camp){
        if(err){
            console.log("error!")
        }else{
          
            passedMsg = msg;
            res.redirect("/sendmail");
            
            
        }
    })
    

    
    
});
app.get("/sendmail",function(req, res) {
   
    res.render("mailSender.ejs",{msg:passedMsg});
  
    
});
app.get("/viewmsgs",function(req, res) {
    
    Message.find({},function(err,message){
        if(!err){
            res.render("viewMsgs.ejs",{message:message});    
        }
    })
    
    
})
app.get("/deletemsg/:id",function(req, res) {
    Message.findByIdAndRemove(req.params.id,function(err){
        if(!err){
            res.redirect("/viewmsgs");
        }
    })
});

app.listen(process.env.PORT,process.env.IP);


