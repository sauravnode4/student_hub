import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useUser } from '../context/userContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Subjects = () => {

    const [subject,setSubject]=useState("");
    const [allSubject,setAllSubject]=useState([]);
    const [edit,setEdit]=useState(null);
    const {setIsLogin,getStdDetails} =useUser();
    const navigate=useNavigate();
        async function getAllSub(){
        try {
          const token=localStorage.getItem('token');
            const res=await axios.get('http://localhost:3000/api/std/subject/allsubject',{
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          setIsLogin(true);
          setAllSubject(res.data.allSubjects);
        } catch (error) {
            toast.error(error.response.data.message);
            localStorage.removeItem('token');
            navigate('/');
        }
      }
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
          setSubject("");
          getAllSub();
        } catch (error) {
            toast.error(error.response.data.message);
            setSubject("");
        }
    }
    const handleRemove=async(id)=>{
      try {
        const token=localStorage.getItem('token');
        const res=await axios.delete(`http://localhost:3000/api/std/subject/remove/${id}`,{
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          toast.success(res.data.message);
          getAllSub();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    const handleEdit=(i)=>{
      setEdit(allSubject[i]._id);
      setSubject(allSubject[i].subject);
    }
    const handleUpdate=async(e)=>{
      e.preventDefault();
      try {
        const token=localStorage.getItem('token');
        const res=await axios.patch('http://localhost:3000/api/std/subject/updatesubject',{subject,editID:edit},{
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
        });
        toast.success(res.data.message);
        setEdit(null);
        setSubject("");
        getAllSub();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    useEffect(()=>{ 
      getStdDetails();
      getAllSub();
    },[]);

  return (
    <div>
      <h1>SUBJECTS</h1>


      <form>
        <input type="text" value={subject} placeholder='sub name' onChange={(e)=>setSubject(e.target.value)} />
        {
          edit ? <input type='submit' value="update" onClick={handleUpdate}/> :<input type="submit"  onClick={handleSubmit}/>
        }
      </form>


      <div>
        {allSubject.map((s,i)=>
          <li key={s._id}>{s.subject}  <button onClick={()=>handleRemove(s._id)}> remove</button> <button onClick={()=>handleEdit(i)}>edit</button></li>
        )}
      </div>
    </div>
  )
}

export default Subjects
