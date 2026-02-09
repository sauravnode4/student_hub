const jwt=require('jsonwebtoken');
const auth=async(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(' ')[1];

        if(!token){
            return res.status(401).json({message:"provide token"})
        }
        
        const payload=jwt.verify(token,'JSP');

        req.payload=payload;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports=auth;