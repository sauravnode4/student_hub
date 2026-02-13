import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const [userDetails,setUserDetails]=useState({
        email:"",
        password:""
    });
    const navigate=useNavigate();
     const handleFormChange=(e)=>{
        const {name,value}= e.target
        setUserDetails((prev)=>{
            return {...prev , [name]:value}
        })
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();

      try {
        const res=await axios.post('http://localhost:3000/api/std/login' , {email:userDetails.email,password:userDetails.password});
        console.log(res.data);
        localStorage.setItem('token',res.data.token);
         toast.success(res.data.message);
         navigate('/profile')
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  return (
    <div>
      <h1>LOGIN PAGE</h1>
       <form onSubmit={handleSubmit}>
             
             <input type="text" value={userDetails.email} placeholder='email' name='email' onChange={handleFormChange}/>
             <input type="password" value={userDetails.password} placeholder='password' name='password' onChange={handleFormChange}/>
             <input type="submit" value="login"/>
        </form>
      <br/><br/>
        <div>Don't have account ? <Link to='/signup'>signup</Link></div>
    </div>
  )
}

export default Login
