const express=require("express");
const dotenv=require("dotenv")
const postRoutes=require("./routes/post")
const authRoutes=require("./routes/auth")
const app=express()
dotenv.config()
const PORT=process.env.PORT || 5000
const mongoose=require("mongoose")
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/post",postRoutes)
app.listen(PORT,()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then (()=>console.log(`server is running at port ${PORT} and DB is running`))
    .catch (err=>console.log(err))
})
app.get("/",(req,res)=>{
    res.send("Kibra Times Api")
})