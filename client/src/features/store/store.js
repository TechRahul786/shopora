import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSclice"

export const store = configureStore({
    reducer:{
        auth:authReducer
    }
})