const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const STD = require("../models/stdModel");

const handleStdSignup=async(req,res)=>{
    try {
        if(req.body== undefined){
            return res.status(400).json({message:"detailsare mandatory to create student account"});
        }
        const {email,name,password,age}=req.body;
        if(! email || !name || ! password || ! age){
            return res.status(400).json({message:"all input fields are mandatory"});
        }
        const isStd=await STD.findOne({email});
        if(isStd){
            return res.status(409).json({message:"student with this email alredy exist"});
        }
        const hashedPass=await bcrypt.hash(password , 10);
        const isCreated= await STD.insertOne({email,name,age,password:hashedPass});
        return res.status(201).json({message:"student account created successfully"});
    } catch (error) {
        return res.status(500).json({message:"inernal server error"})
    }
    
}

const handleStdLogin=async(req,res)=>{
    try {
        if(req.body== undefined){
            return res.status(400).json({message:"detailsare mandatory to login into student account"});
        }
        const {email,password}=req.body;
        if(! email || ! password){
            return res.status(400).json({message:"all input fields are mandatory"});
        }

        const isStd=await STD.findOne({email});

        if(! isStd){
            return res.status(400).json({message:"invalid email"});
        }

        const isMatched=await bcrypt.compare(password , isStd.password);

        if(! isMatched){
            return res.status(400).json({message:"invalid password"});
        }

        const token=jwt.sign({email,_id:isStd._id ,role : isStd.role},'JSP',{expiresIn:'1h'});

        return res.status(200).json({message:"login successfull" , token});

    } catch (error) {
        return res.status(500).json({message:"inernal server error"})
    }
}


const getStdDetails=async(req,res)=>{
    try {
        const {_id}=req.payload;

        const isStd=await STD.findById({_id} ,{password:0});
        if(! isStd){
            return res.status(401).json({message:"token not vaild because acc has been deleted"});
        }

        return res.status(200).json({std:isStd});
    } catch (error) {
        return res.status(500).json({message:"inernal server error"})
    }
}
module.exports={handleStdSignup,handleStdLogin,getStdDetails}

