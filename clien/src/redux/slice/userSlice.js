import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name:"user",
    initialState:{
        name:"",
        email:"",
        role:"",
        age:"",
        isLogin:false
    },
    reducers:{
        updateUser:(state,action)=>{
            state.name=action.payload.name;
            state.age=action.payload.age;
            state.email=action.payload.email;
            state.role=action.payload.role;
            state.isLogin=action.payload.isLogin;
        }
    }
})


export const userReducer=userSlice.reducer;

export const {updateUser} =userSlice.actions;