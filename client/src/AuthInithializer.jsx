import React, { useEffect } from "react";
import api from "./services/api";
import { useDispatch } from "react-redux";
import { clearState, setUser } from "./features/store/slice/authSclice";
const AuthInithializer = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/auth/me");
        const user = response.data.user;
        console.log(user)
        dispatch(setUser(user));
      } catch (error) {
        dispatch(clearState());
      }
    };
    checkAuth()
  },[dispatch]);
  return children;
};

export default AuthInithializer;
