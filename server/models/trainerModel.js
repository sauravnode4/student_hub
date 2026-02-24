const mongoose=require('mongoose');

const trainerSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    password:{type:String,required:true},
    age:{type:String,required:true,default:18},
    role:{type:String,default:"trainer"},
});

const TRAINER= mongoose.model('trainer',trainerSchema);

module.exports=TRAINER;