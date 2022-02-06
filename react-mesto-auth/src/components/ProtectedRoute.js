import React from "react";
import reactDom from "react-dom";
import { Routes, Route, Navigate } from "react-router-dom";

function ProtectedRoute({ children, redirectTo, loggedIn }) {
    return loggedIn ? children : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;
