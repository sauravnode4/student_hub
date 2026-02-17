import axios from 'axios';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext';

const Profile = () => {
  // const {name,email,age}=useSelector((state)=>state.user);
  // const dispatch=useDispatch();
  const {userDetails,setUserDetails,setIsLogin} =useUser()
  const navigate=useNavigate();
  useEffect(()=>{
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
    getStdDetails();
  },[]);
  return (
    <div>
      <h1>PROFILE</h1>

      <h3>name : {userDetails.name}</h3>
      <h3>age : {userDetails.age}</h3>
      <h3>email : {userDetails.email}</h3>
    </div>
  )
}

export default Profile
