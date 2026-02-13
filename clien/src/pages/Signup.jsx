import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
const Signup = () => {
    const [userDetails,setUserDetails]=useState({
        email:"",
        name:"",
        age:"",
        password:""
    });
    const navigate=useNavigate()
    const handleFormChange=(e)=>{
        const {name,value}= e.target
        setUserDetails((prev)=>{
            return {...prev , [name]:value}
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {email,name,age,password}=userDetails;
        try {
           const res=await  axios.post('http://localhost:3000/api/std/signup',{email,age,name,password});
           toast.success(res.data.message);
            navigate('/login');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
  return (
    <div>
        <h1>SIGNUP PAGE</h1>
        <form onSubmit={handleSubmit}>
             <input type='text' value={userDetails.name} placeholder='name' name='name' onChange={handleFormChange}></input>
             <input type="text" value={userDetails.email} placeholder='email' name='email' onChange={handleFormChange}/>
             <input type="text" value={userDetails.age} placeholder='age' name='age' onChange={handleFormChange}/>
             <input type="password" value={userDetails.password} placeholder='password' name='password' onChange={handleFormChange}/>
             <input type="submit" value="signup" />
        </form>
        <br/><br/>
        <div>alredy have an account ? <Link to='/login'>Login</Link></div>
    </div>
  )
}

export default Signup
