import React, { useState } from 'react'
import { useUser } from '../context/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [otp,setOtp]=useState("");
     const [password,setPassword]=useState("");
    const [step,setStep]=useState(0);
    const {user,setUser}=useUser()
    const handleGetOtp= async(e)=>{
        e.preventDefault();
        const toastId=toast.loading('generating otp and sending to your email');
        try {
          const res=await axios.post('http://localhost:3000/api/otp',{email,role:user});
          toast.dismiss(toastId)
          toast.success(res.data.message);
          setStep(1);
        } catch (error) {
          toast.dismiss(toastId)
          toast.error(error.response.data.message);
        }
    
    }

    const handleVerifyOtp=async(e)=>{
       e.preventDefault();
       try {
          const res=await axios.post('http://localhost:3000/api/otp/verify',{email,otp});

          toast.success(res.data.message);
          setStep(2);
       } catch (error) {
          toast.error(error.response.data.message);
       }
    }

    const handleUpdatePassword=async(e)=>{
      e.preventDefault();
      const toastId=toast.loading('changing password');
      try {
          const res=await axios.patch('http://localhost:3000/api/otp/changePassword',{email,role:user,password});
          toast.dismiss(toastId);
          toast.success(res.data.message);
          navigate('/login');
      } catch (error) {
         toast.dismiss(toastId);
        toast.error(error.response.data.message);
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
