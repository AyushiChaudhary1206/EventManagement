const express=require("express");
const app=express();
const cors=require("cors");
const mainroute=require('./routes/mainroutes');
app.use(cors());


app.use(express.json());
app.use("/api/v1",mainroute);
const PORT=process.env.PORT||3001;
app.listen(PORT,()=>{
console.log(`SERVER LISTENING ON PORT :${PORT}`);
});