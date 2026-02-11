const express=require('express');
const { handleStdSignup, handleStdLogin, getStdDetails, handleUpdateStdName, handleStdUpdatePassword } = require('../controllers/stdController');
const auth = require('../auth/auth');

const stdRouter=express.Router();

//testing api
stdRouter.get('/',(req,res)=>{
    return res.json({message:"std router at work"})
});

//signup std 
stdRouter.post('/signup',handleStdSignup)

//login std
stdRouter.post('/login',handleStdLogin);

//get std details
stdRouter.get('/get',auth,getStdDetails);

//std update name
stdRouter.patch('/updatename',auth,handleUpdateStdName);

//update std password
stdRouter.patch('/updatepassword',auth,handleStdUpdatePassword);

module.exports=stdRouter;