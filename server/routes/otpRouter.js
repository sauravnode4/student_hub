
const express=require('express');
const { handleGetOtp, handleVerifyOtp, handleUpdatePassword } = require('../controllers/otpController');

const otpRouter=express.Router();

otpRouter.post('/',handleGetOtp);

otpRouter.post('/verify',handleVerifyOtp);

otpRouter.patch('/changePassword',handleUpdatePassword);

module.exports=otpRouter;