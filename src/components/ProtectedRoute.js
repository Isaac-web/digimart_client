import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../customHooks/useAuth";

const ProtectedRoute = ({ path, element }) => {
  const loggedIn = useAuth();
  return (
    <React.Fragment>
      {loggedIn ? <Outlet /> : <Navigate to="/login" />}
    </React.Fragment>
  );
};

export default ProtectedRoute;
