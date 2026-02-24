const express=require('express');
const { handleTrainerSignup, handleTrainerLogin, getTrainerDetails } = require('../controllers/trainerController');
const auth = require('../auth/auth');

const trainerRouter=express.Router();

//testing api
trainerRouter.get('/',(req,res)=>{
    return res.json({message:"trainer router at work"})
});

trainerRouter.post('/signup',handleTrainerSignup);

trainerRouter.post('/login',handleTrainerLogin);

trainerRouter.get('/get',auth,getTrainerDetails);

module.exports=trainerRouter;