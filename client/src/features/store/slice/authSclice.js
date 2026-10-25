import {createSlice} from "@reduxjs/toolkit"
const authSlice = createSlice({
    name:"auth",
    initialState:{
        state:null,
        loading:true
    },
    reducers:{
        setUser:(state,action)=>{
              state.user = action.payload
                state.loading = false
        },

        clearState:(state,action)=>{
            state.user = null,
            state.loading = false  
        },

        setAuthLoading:(state,action) =>{
            state.loading = action.payload
        }
    }


})

export const {setUser,clearState,setAuthLoading} = authSlice.actions

export default authSlice.reducer