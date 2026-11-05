import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./features/store/slice/authSclice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return children;
};

export default AuthInitializer;