var express = require("express");
var app  = express();
app.use(express.static(__dirname + "/public"));
app.get("/",function(req,res){
    res.render("homepage.ejs");
})
app.get("/about",function(req,res){
    res.send("About.hmtl");
})




app.listen(process.env.PORT,process.env.IP);