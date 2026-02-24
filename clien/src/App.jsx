import React from 'react'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import {Toaster} from 'react-hot-toast'
import Navbar from './component/Navbar'
import { useUser } from './context/userContext'
import Subjects from './pages/Subjects'
import AllStudents from './pages/AllStudents'

const App = () => {
  const {isLogin} =useUser()
  const token=localStorage.getItem('token');
  return (
    <BrowserRouter>
          {isLogin && <Navbar/>}
        <Toaster></Toaster>
        <Routes>
          <Route path='/' element={token ? <Navigate to='/profile' /> : <Navigate to='/login' />} ></Route>
          <Route path='/login' element={<Login/>}> </Route>
          <Route path='/profile' element={<Profile/>} ></Route>
          <Route path='/signup' element={<Signup />} ></Route>
          <Route path='/subject' element={<Subjects/>} ></Route>
          <Route path='/allstudents' element={<AllStudents/>} ></Route>

        </Routes>
        
    </BrowserRouter>
  )
}

export default App
