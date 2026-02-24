const TRAINER = require("../models/trainerModel");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const handleTrainerSignup=async(req,res)=>{
    try {
            if(req.body== undefined){
                return res.status(400).json({message:"detailsare mandatory to create trainer account"});
            }
            const {email,name,password,age,code}=req.body;
            if(! email || !name || ! password || ! age || ! code){
                return res.status(400).json({message:"all input fields are mandatory"});
            }
            if( code != 'JSP@123'){
                return res.status(401).json({message:"incorrect code"});
            }
            
            const isTrainer=await TRAINER.findOne({email});
            if(isTrainer){
                return res.status(409).json({message:"trainer with this email alredy exist"});
            }
          
            const hashedPass=await bcrypt.hash(password , 10);
           
            const isCreated= await TRAINER.insertOne({email,name,age,password:hashedPass});
            return res.status(201).json({message:"trainer account created successfully"});
        } catch (error) {
            return res.status(500).json({message:"inernal server error"})
        }
}

const handleTrainerLogin=async(req,res)=>{
    try {
        if(req.body== undefined){
            return res.status(400).json({message:"detailsare mandatory to login into trainer account"});
        }
        const {email,password}=req.body;
        if(! email || ! password){
            return res.status(400).json({message:"all input fields are mandatory"});
        }

        const isTrainer=await TRAINER.findOne({email});

        if(! isTrainer){
            return res.status(400).json({message:"invalid email"});
        }

        const isMatched=await bcrypt.compare(password , isTrainer.password);

        if(! isMatched){
            return res.status(400).json({message:"invalid password"});
        }

        const token=jwt.sign({email,_id:isTrainer._id ,role : isTrainer.role},'JSP',{expiresIn:'1h'});

        return res.status(200).json({message:"login successfull" , token});

    } catch (error) {
        return res.status(500).json({message:"inernal server error"})
    }
}

const getTrainerDetails=async(req,res)=>{
    try {
        const {_id}=req.payload;

        const isTrainer=await TRAINER.findById({_id} ,{password:0});
        if(! isTrainer){
            return res.status(401).json({message:"token not vaild because acc has been deleted"});
        }

        return res.status(200).json({user:isTrainer});
    } catch (error) {
        return res.status(500).json({message:"inernal server error"})
    }
}

module.exports={handleTrainerSignup,handleTrainerLogin,getTrainerDetails}