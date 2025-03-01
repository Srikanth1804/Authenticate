import React, { useState } from "react";
import Axios from "axios";
import API_ENDPOINT from "./Generaldata";
import { useNavigate, useParams } from "react-router-dom";
const Reset = () => {
  let [password, setpassword] = useState("");
  let { id, token } = useParams();
  let [alert, setAlert] = useState({ message: "", type: "" });

  let Navigate = useNavigate();

  let Handlesubmit = (e) => {
    e.preventDefault();

    Axios.put(`${API_ENDPOINT}/api/reset-password/${id}/${token}`, { password })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setAlert({ message: res.data.msg, type: "success" });

          setTimeout(() => {
            Navigate("/");
          }, 2000);

          setpassword("");
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
  };

  return (
    <div
      className="container mt-5 p-4 rounded shadow"
      style={{
        backgroundColor: "#f8f9fa",
        maxWidth: "500px",
        padding: "25px",
        borderRadius: "8px",
      }}
    >
      <h2 className="mb-4 text-center text-dark">New password</h2>
      {/*  Alert Message */}
      {alert.message && (
        <div className={`alert alert-${alert.type} text-center`} role="alert">
          {alert.message}
        </div>
      )}
      <form action="" onSubmit={Handlesubmit}>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label fw-bold">
            Password
          </label>{" "}
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
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Reset;
