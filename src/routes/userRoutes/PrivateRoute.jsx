import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/unauthorized" />; // Redirect if no token
  }

  return <Outlet />; // Render child route if token exists
};

export default PrivateRoute;
