const mongoose=require("mongoose");
require ("dotenv").config();
mongoose.connect(process.env.MONGO_URL);

const UserSchema=mongoose.Schema({
name:String,
password:String,
email:String,
});
 const EventSchema=mongoose.Schema({
  title:String,
  description:String,
  date:String,
  time:String,
 })
 const AtendeeSchema=mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    city:String,
    event:String,
   })




const  User=mongoose.model("User",UserSchema);
const  Event=mongoose.model("Events",EventSchema)
const  Atendee=mongoose.model("Atendee",AtendeeSchema)
module.exports={
    User,
    Event,
    Atendee
}