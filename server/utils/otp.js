
const generateRandomOtp=()=>{
    const otp=Math.trunc(Math.random() * 10000);
    if(otp > 999){
        return otp
    }

    return otp+""+ Math.trunc(Math.random()*10);
}

module.exports={generateRandomOtp}