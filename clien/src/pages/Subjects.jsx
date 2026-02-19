import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

const Subjects = () => {

    const [subject,setSubject]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const token=localStorage.getItem('token');
            const res=await axios.post('http://localhost:3000/api/std/subject/add',{subject},{
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
        });
          toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
  return (
    <div>
      <h1>SUBJECTS</h1>


      <form>
        <input type="text" placeholder='sub name' onChange={(e)=>setSubject(e.target.value)} />
        <input type="submit"  onClick={handleSubmit}/>
      </form>
    </div>
  )
}

export default Subjects
