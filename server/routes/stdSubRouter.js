const express=require('express');
const auth = require('../auth/auth');
const { handleAddSubject } = require('../controllers/subjectController');

const stdSubRouter=express.Router();

stdSubRouter.post('/add',auth,handleAddSubject);


module.exports=stdSubRouter;