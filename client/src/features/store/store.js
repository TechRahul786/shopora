import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSclice"
import dataReducer from "./slice/dataSlice"
import cartReducer from "./slice/cartSlice"

export const store = configureStore({
    reducer:{
        auth:authReducer,
        data:dataReducer,
        cart:cartReducer,
    }
})