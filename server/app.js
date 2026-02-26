const express=require('express');
const cors=require('cors');
const {configDotenv}=require('dotenv');
const connectDb = require('./dbConnection/db.js');
const stdRouter = require('./routes/stdRouter.js');
const stdSubRouter = require('./routes/stdSubRouter.js');
const trainerRouter = require('./routes/trainerRouter.js');
const otpRouter = require('./routes/otpRouter.js');
const app=express();

app.use(cors());
connectDb()
//server testing api

//parsing json data
app.use(express.json());

app.get('/',(req,res)=>{
    return res.json({message:"student_hub server at work"});
});

//api for std
app.use('/api/std',stdRouter);

app.use('/api/std/subject',stdSubRouter);

app.use('/api/trainer',trainerRouter);

app.use('/api/otp',otpRouter);

app.listen(3000, 'localhost',()=>{
    console.log("server started at http://localhost:3000")
});