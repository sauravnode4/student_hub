const express=require('express');
const auth = require('../auth/auth');
const { handleAddSubject, handleGetAllSubject, handleRemoveSubject } = require('../controllers/subjectController');

const stdSubRouter=express.Router();

stdSubRouter.post('/add',auth,handleAddSubject);

stdSubRouter.get('/allsubject',auth,handleGetAllSubject);

stdSubRouter.delete('/remove/:id',auth,handleRemoveSubject);
module.exports=stdSubRouter;