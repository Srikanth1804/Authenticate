import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_ENDPOINT from "./Generaldata";

const Register = () => {
  let [name, setname] = useState("");
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");
  let [role, setrole] = useState("");
  let [alert, setAlert] = useState({ message: "", type: "" });

  let Navigate = useNavigate();

  let Handlesubmit = (e) => {
    e.preventDefault();

    Axios.post(`${API_ENDPOINT}/api/register`, {
      name,
      email,
      password,
      role,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setAlert({ message: res.data.msg, type: "success" });

          setTimeout(() => {
            Navigate("/");
          }, 1500);
        } else {
          setAlert({ message: res.data.msg, type: "danger" });
        }
      })
      .catch((e) => {
        console.log(e);
        setAlert({
          message: e.response?.data?.msg || "Something went wrong!",
          type: "danger",
        });
      });

    setname("");
    setemail("");
    setpassword("");
    setrole("");
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
      <h2 className="mb-4 text-center text-dark">User Registration Form</h2>

      {/* ✅ Alert Message */}
      {alert.message && (
        <div className={`alert alert-${alert.type} text-center`} role="alert">
          {alert.message}
        </div>
      )}

      <form onSubmit={Handlesubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-bold">
            Name
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            onChange={(e) => setname(e.target.value)}
            value={name}
            style={{ boxShadow: "none" }}
          />
        </div>
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
        <div className="mb-3">
          <label className="form-label fw-bold">Role</label>
          <select
            className="form-select"
            onChange={(e) => setrole(e.target.value)}
            value={role}
            required
            style={{ boxShadow: "none" }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100 fw-bold">
          Register
        </button>

        <div className="text-center mt-3">
          <p style={{ fontSize: "14px", color: "#555" }}>
            Already have an account?{" "}
            <Link
              to="/"
              style={{
                color: "#007bff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
