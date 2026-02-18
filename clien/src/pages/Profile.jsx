import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext';

const Profile = () => {
  const [edit,setEdit]=useState("");
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [newPassword,setNewPassword]=useState("");
  const {userDetails,setUserDetails,setIsLogin} =useUser()
  const navigate=useNavigate();
  const getStdDetails=async()=>{
      const token=localStorage.getItem('token');
      if(! token) {
        return navigate('/login');
      }
      try {
        const res=await axios.get('http://localhost:3000/api/std/get',{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUserDetails(res.data.std);
        setIsLogin(true);
      } catch (error) {
          toast.error(error.response.data.message);
          localStorage.removeItem('token');
          navigate('/login');
      }
    }
  useEffect(()=>{
    getStdDetails();
  },[]);

  const handleUpdateName=async(e)=>{
    e.preventDefault();
    try {
      const token=localStorage.getItem('token');
      const res=await axios.patch('http://localhost:3000/api/std/updatename',{name}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      toast.success(res.data.message);
      setEdit("");
      getStdDetails();
      setName("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleUpdatePassword=async(e)=>{
    e.preventDefault();
    try {
       const token=localStorage.getItem('token');
      const res=await axios.patch('http://localhost:3000/api/std/updatepassword',{password,newPassword},{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      toast.success(res.data.message);
      localStorage.removeItem('token');
      navigate('/login');
      setIsLogin(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setPassword("");
      setNewPassword("");
    }
  }
  return (
    <div>
      <h1>PROFILE</h1>

      <h3>name : {userDetails.name}  <button onClick={()=>setEdit("name")}>edit name</button></h3>
      <h3>age : {userDetails.age}</h3>
      <h3>email : {userDetails.email}</h3>


     {
       edit == 'name' && <form >
       <input type="text" placeholder='name'  value={name} onChange={(e)=>setName(e.target.value)}/>
      <input type="submit" value="update name" onClick={handleUpdateName}/>
     </form>
     }

     <br/>
     <button onClick={()=>setEdit("password")}>update password</button>
     <br/>
     {
       edit == 'password' && <form >
       <input type="text" placeholder='old password'  value={password} onChange={(e)=>setPassword(e.target.value)}/>
       <input type="text" placeholder='new password'  value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
      <input type="submit" value="update password" onClick={handleUpdatePassword}/>
     </form>
     }

    </div>
  )
}

export default Profile
