const express=require('express');
const {configDotenv}=require('dotenv');
const connectDb = require('./dbConnection/db.js');
const stdRouter = require('./routes/stdRouter.js');
const app=express();

connectDb()
//server testing api

//parsing json data
app.use(express.json());

app.get('/',(req,res)=>{
    return res.json({message:"student_hub server at work"});
});

//api for std
app.use('/api/std',stdRouter);

app.listen(3000, 'localhost',()=>{
    console.log("server started at http://localhost:3000")
});