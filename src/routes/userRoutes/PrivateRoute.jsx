import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/unauthorized" replace />; // Redirect if no token
  }

  return children; // Render child route if token exists
};

export default PrivateRoute;
