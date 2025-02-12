const express=require("express");
const app=express();
const router=express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User,Event, Atendee } = require("../db");

require ("dotenv").config();


const schema = zod.object({
    name:zod.string(),
  email: zod.string().email(),
  password: zod.string(),

});
router.post("/signup",async(req,res)=>{
  const body=req.body;

  const {success}=schema.safeParse(body);
  if (!success) {
    res.send("invalid inputs");
    return
  }
  const user = await User.findOne({
    email: req.body.email,
  });
  if(user){
        res.send("E-mail already taken");
       return;
  }
  const dbuser=await User.create({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password
  })
 
  const userid=dbuser._id.toString();
 
  const token=jwt.sign(
    {userid},
    process.env.JWT_SECRET
  );
 
  res.json({
    msg:"user created successfully",
    userid:userid,
    token:token,
  })
})

const login=zod.object({
  email:zod.string().email(),
  password:zod.string()
})
router.post("/login",async(req,res)=>{
  const body=req.body;
  console.log(body);
  const {success}=login.safeParse(body);
  if(!success){
    res.send("invalid inputs");
    return;
  }
 const user=await User.findOne({
  email:req.body.email,
  password:req.body.password
 })
 

 if(user){
  const id=user._id.toString();
  const token=jwt.sign({id},process.env.JWT_SECRET);
  res.json({token:token})


  return
}
res.status(411).json({
  message:"Error Logging"
})
})


router.post("/events",async(req,res)=>{
  const event=await Event.create({
    title:req.body.title,
    description:req.body.description,
    date:req.body.date,
    time:req.body.time,
  })
  res.json({
    msg:"event created sucessfully",
    eventdetail:event
  })
})

router.get("/getevents",async(req,res)=>{
  const events=await Event.find();
  res.json({events:events});
})
const schemas = zod.object({
  name:zod.string(),
email: zod.string().email(),
phone: zod.string(),
city:zod.string(),
event:zod.string()

});
router.post("/atendee",async(req,res)=>{
  const body=req.body;
console.log(body)
  const {success}=schemas.safeParse(body);
  console.log(success);
  if (!success) {
    res.status(411).send("invalid inputs");
    return
  }
    await Atendee.create({
  name:req.body.name,
  email:req.body.email,
  phone:req.body.phone,
  city:req.body.city,
  event:req.body.event

})
res.json({
  "msg":"registered Successfully"
})
   
})

router.post("/filterevents",async(req,res)=>{
  const response=await Event.find({
  date:req.body.date,
 

  })
  if(!response){
    res.status(411).json("NO events");
  }
  res.json({
    events:response
  })
})

router.get("/getatendee",async(req,res)=>{
  const response=await Atendee.find();
  console.log(response);
  res.json({
    atendees:response
  })
})
module.exports=router;