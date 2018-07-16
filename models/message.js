var mongoose = require("mongoose");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var messageSchema= new Schema({
    
  name:String,
  phone:Number,
  message:String
});

module.exports = mongoose.model("message",messageSchema);