import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[],
        loading:false
    },

    reducers:{
        setCart:(state,action)=>{
            state.items = action.payload
            state.loading = false
        }
    }
})

export const {setCart} = cartSlice.actions
export default cartSlice.reducer