import { createSlice } from "@reduxjs/toolkit";

createSlice({
    name:'category',
    initialState:{
        categories:[],
        loading:true
    },
    reducers:{
        setCetegory:(state,action)=>{
            state.categories = action.payload
            state.loading = false
        }
    }
})

