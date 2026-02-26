import React, { useState } from 'react'
import { useUser } from '../context/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
    const [email,setEmail]=useState("");
    const [otp,setOtp]=useState("");
     const [password,setPassword]=useState("");
    const [step,setStep]=useState(0);
    const {user,setUser}=useUser()
    const handleGetOtp= async(e)=>{
        e.preventDefault();
        
        try {
          const res=await axios.post('http://localhost:3000/api/otp',{email,role:user});
          toast.success(res.data.message);
          setStep(step+1);
        } catch (error) {
          toast.error(error.response.data.message);
        }
    
    }

    const handleVerifyOtp=async(e)=>{
       e.preventDefault();
       try {
          const res=await axios.post('http://localhost:3000/api/otp/verify',{email,otp});

          toast.success(res.data.message);
          setStep(step+1);
       } catch (error) {
          toast.error(error.response.data.message);
       }
    }

    const handleUpdatePassword=async(e)=>{
      e.preventDefault();
      try {
        
      } catch (error) {
        
      }
    }
  return (
    <div>
      <h1>FORGET PASSWORD PAGE</h1>

      {
        step== 0 && <>
          <form>
        <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="submit" value="get otp" onClick={handleGetOtp}/>
      </form>

      <h5>forget password as a {user}</h5>
      <button onClick={()=>setUser('std')}>std</button> 
      <button onClick={()=>setUser('trainer')}>trainer</button>
        </>
      }
      {
        step == 1 && <>
          <form>
        <input type="text" placeholder='enter otp' value={otp} onChange={(e)=>setOtp(e.target.value)}/>

        <input type="submit" value="verify" onClick={handleVerifyOtp}/>
      </form>
        </>
      }

      {
        step == 2 && <>
            <form>
        <input type="text" placeholder='new password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

        <input type="submit" value="update pass" onClick={handleUpdatePassword}/>
      </form>
        </>
      }
    </div>
  )
}

export default ForgetPassword
