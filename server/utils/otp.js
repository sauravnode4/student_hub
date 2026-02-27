
const generateRandomOtp=()=>{
    console.log(1)
    const otp=Math.trunc(Math.random() * 10000);
    if(otp > 999){
          console.log(2)
        return otp
    }
     console.log(2)
    return otp+""+ Math.trunc(Math.random()*10);
}

module.exports={generateRandomOtp}