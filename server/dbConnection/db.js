const mongoose=require('mongoose');
const connectDb=async()=>{
    try {
       await mongoose.connect('mongodb://localhost:27017/std_hub');
        console.log("db connected");
    } catch (error) {
        console.log("db NOT connected");
    }
}

module.exports=connectDb;