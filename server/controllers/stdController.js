const bcrypt=require('bcrypt');
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

module.exports={handleStdSignup}