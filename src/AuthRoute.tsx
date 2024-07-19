import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "./context/authContext";

const AuthRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default AuthRoute;