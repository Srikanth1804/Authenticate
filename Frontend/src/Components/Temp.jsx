import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Getuser from "./Getuser";
import Forgot from "./Forgot";
import Reset from "./Reset";

const IsAuthenticate = () => {
  let Verifytoken = localStorage.getItem("token");
  console.log(Verifytoken);
  return Verifytoken ? true : false;
};

const ProtectedRoute = ({ children, roleRequired }) => {
  let role = localStorage.getItem("role");
  if (!IsAuthenticate()) {
    return <Navigate to="/" replace />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

const Temp = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/getuser"
            element={
              <ProtectedRoute roleRequired="admin">
                <Getuser />
              </ProtectedRoute>
            }
          />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/reset-password/:id/:token" element={<Reset />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Temp;
