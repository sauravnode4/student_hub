import { createContext, useContext, useState } from "react";
const UserContext=createContext();
export const UserWrapper=({children})=>{
    const [userDetails,setUserDetails]=useState({email:"",name:"",age:"",role:""});
    const [user,setUser]=useState(localStorage.getItem('user') || 'std');
    const [isLogin,setIsLogin]=useState(false);
    return <UserContext.Provider value={{userDetails,setUserDetails,isLogin,setIsLogin,user,setUser}}>
            {children}
    </UserContext.Provider>
} 

export const useUser=()=>{
    return useContext(UserContext);
}