const OTP = require("../models/otpModel");
const bcrypt=require('bcrypt')
const STD = require("../models/stdModel");
const TRAINER = require("../models/trainerModel");
const sendOtpMail = require("../utils/mail");
const { generateRandomOtp } = require("../utils/otp");

const handleGetOtp=async(req,res)=>{
    if(req.body== undefined){
            return res.status(400).json({message:"detailsare mandatory to send otp"});
        }
    const {email,role} =req.body;
       
    if(! email || ! role){
            return res.status(400).json({message:"all input fields are mandatory to genrate otp"});
    }

    try {
        let isUser;
        if(role == 'std'){
            isUser=await STD.findOne({email});
        }else{
            isUser=await TRAINER.findOne({email});
        }
       
        if(! isUser){
                return res.status(400).json({message:`${role} with this email does not exist`})
        }
        const isOtp=await OTP.findOne({email});
        
        if(isOtp){
                await OTP.findOneAndDelete({email});
        }
       
        const otp=generateRandomOtp();
        console.log("otp = " ,otp);
        await OTP.insertOne({email,otp});
        
        const isOtpSend=await sendOtpMail(email,otp);
        if(isOtpSend){
                return res.status(200).json({message:"otp has be send to your email"})
        }else{
                return res.status(503).json({message:"otp service is unavialable"});
            }
    } catch (error) {
        return res.status(500).json({message:"inernal server error"})
    }
}

const handleVerifyOtp=async(req,res)=>{
    if(req.body== undefined){
            return res.status(400).json({message:"detailsare mandatory to verify otp"});
        }
    const {email,otp} =req.body;
     if(! email || ! otp){
            return res.status(400).json({message:"all input fields are mandatory to verify otp"});
    }

    try {
        const isUser=await OTP.findOne({email,otp});

        if(!isUser){
            return res.status(400).json({message:"incorrect otp"});
        }

        return res.status(200).json({message:"otp verifyed successfully"})
    } catch (error) {
        return res.status(500).json({message:"inernal server error"})
        
    }
}

const handleUpdatePassword=async(req,res)=>{
    try {
        console.log("req came");
    if(req.body== undefined){
            return res.status(400).json({message:"detailsare mandatory to update password using otp"});
    }
    const {email,password,role} =req.body;
     if(! email || ! password || !role){
            return res.status(400).json({message:"all input fields are mandatory to change password"});
    }
    const hashedPassword=await bcrypt.hash(password,10);
    
    if(role == 'std'){
       await STD.findOneAndUpdate({email},{$set:{password:hashedPassword}});
    }else{
        await TRAINER.findOneAndUpdate({email},{$set:{password:hashedPassword}});
    }
    return res.status(200).json({message:"password changed successfully"});
    } catch (error) {
        return res.status(500).json({message:"inernal server error"})
    }
}
module.exports={handleGetOtp,handleVerifyOtp,handleUpdatePassword}