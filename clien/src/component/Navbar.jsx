import React from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext';


const Navbar = () => {
    const navigate=useNavigate();
    const {setUserDetails,setIsLogin} =useUser()
    const handleLogout=()=>{
        localStorage.removeItem('token');
        toast.success('logout successfully');
        setUserDetails({name:"",email:"",age:"",role:""});
        setIsLogin(false);
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
