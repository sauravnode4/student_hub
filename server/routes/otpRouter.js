
const express=require('express');
const { handleGetOtp, handleVerifyOtp } = require('../controllers/otpController');

const otpRouter=express.Router();

otpRouter.post('/',handleGetOtp);

otpRouter.post('/verify',handleVerifyOtp);

module.exports=otpRouter;