import React, { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./context/authContext";

const AuthRoute = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default AuthRoute;