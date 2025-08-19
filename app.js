//imports
import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./userManagement/routes/users.routes.js";
import deviceRoutes from "./deviceManagement/routes/device.routes.js";
import logRoutes from "./dataAnalytics/routes/data.routes.js"

//secretCodes
if(process.env.NODE_ENV!="production"){
    dotenv.config()
}

//variables
const app=express()
const dburl=process.env.MONGO_URL


//connection to server
async function main(){
    await mongoose.connect(dburl)
}
main()
.then((res)=>{
    console.log("Connected to DB")
})
.catch((e)=>{
    console.log(e)
})


app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/users",userRoutes)
app.use("/api/v2/devices", deviceRoutes);
app.use('/api/v3', logRoutes);

app.listen(8000,()=>{
    console.log("Server is listening on port 8000")
})

