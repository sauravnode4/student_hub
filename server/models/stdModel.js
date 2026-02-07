const mongoose=require('mongoose');

const stdSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    password:{type:String,required:true},
    age:{type:String,required:true,default:18},
    role:{type:String,default:"std"},
});

const STD= mongoose.model('std',stdSchema);

module.exports=STD;