const express=require('express');
const { handleStdSignup } = require('../controllers/stdController');

const stdRouter=express.Router();

//testing api
stdRouter.get('/',(req,res)=>{
    return res.json({message:"std router at work"})
});

//signup std 
stdRouter.post('/signup',handleStdSignup)

module.exports=stdRouter;