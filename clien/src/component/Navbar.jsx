import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { updateUser } from '../redux/slice/userSlice';

const Navbar = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const handleLogout=()=>{
        localStorage.removeItem('token');
        toast.success('logout successfully');
        dispatch(updateUser({name:"",email:"",age:"",isLogin:false,role:""}));
        navigate('/login');
    }
  return (
    <div>
        <nav> 
            <Link to="/profile">Profile</Link>
            
            <button onClick={handleLogout}>Logout</button>
        </nav>
    </div>
  )
}

export default Navbar
