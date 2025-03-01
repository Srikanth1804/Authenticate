import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import API_ENDPOINT from "./Generaldata";

const Login = () => {
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  let [alert, setAlert] = useState({ message: "", type: "" });

  let Navigate = useNavigate();

  let Handlesubmit = (e) => {
    e.preventDefault();
    Axios.post(`${API_ENDPOINT}/api/login`, { email, password })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          localStorage.setItem("token", res.data.info);
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("role", res.data.role);
          setAlert({
            message: res.data.msg,
            type: "success",
          });

          setTimeout(() => {
            Navigate("/home");
          }, 1500);
        }
      })
      .catch((e) => {
        console.log(e);
        setAlert({
          message: e.response?.data?.msg || "Something went wrong!",
          type: "danger",
        });
      });

    setemail("");
    setpassword("");
  };

  return (
    <div
      className="container mt-5 p-4 rounded shadow"
      style={{
        backgroundColor: "#f8f9fa",
        maxWidth: "500px",
        borderRadius: "8px",
      }}
    >
      <h2 className="mb-4 text-center text-dark">Login Form</h2>

      {/*  Alert Message */}
      {alert.message && (
        <div className={`alert alert-${alert.type} text-center`} role="alert">
          {alert.message}
        </div>
      )}

      <form onSubmit={Handlesubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setemail(e.target.value)}
            value={email}
            style={{ boxShadow: "none" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label fw-bold">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="pwd"
            placeholder="Enter your password"
            required
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            style={{ boxShadow: "none" }}
          />
        </div>
        <button type="submit" className="btn btn-success w-100 fw-bold">
          Login
        </button>
        <div className="text-center mt-3">
          <p style={{ fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="fw-bold"
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </p>
          <p style={{ fontSize: "14px" }}>
            <Link
              to="/forgot-password"
              className="fw-bold"
              style={{ color: "darkred", textDecoration: "none" }}
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
