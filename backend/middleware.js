const {JWT_SECRET}=require('./config')
const jwt=require("jsonwebtoken");

const authmiddleware=(req,res,next)=>{
const authheader=req.headers.authorization;
console.log(authheader);
if(authheader.startsWith("Bearer")){
    token=authheader.split(" ")[1];;
}else{
    token=authheader;
}
console.log(token);


try{
    const decoded=jwt.verify(token,JWT_SECRET);
    console.log(decoded);
   req.id=decoded.id;
  
   next();
}
catch{
res.status(411).json({
    msg:"error here"
})
}


}

module.exports={
    authmiddleware
}