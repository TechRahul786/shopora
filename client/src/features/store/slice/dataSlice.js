import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name:'data',
    initialState:{
        categoies:[],
        products:[],
        loading:true
    },

    reducers:{
        setCategoris:(state,action)=>{
            state.categoies = action.payload
            state.loading = false
        },
        setProducts:(state,action)=>{
            state.products = action.payload
            state.loading = false
        },
    }
})

export const {setCategoris,setProducts} = dataSlice.actions
export default dataSlice.reducer
