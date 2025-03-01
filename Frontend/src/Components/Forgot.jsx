import React, { useState } from "react";
import Axios from "axios";
import API_ENDPOINT from "./Generaldata";
const Forgot = () => {
  let [email, setemail] = useState("");
  let [alert, setAlert] = useState({ message: "", type: "" });

  let Handlesubmit = (e) => {
    e.preventDefault();

    Axios.post(`${API_ENDPOINT}/api/forgot-password`, { email })
      .then((res) => {
        console.log(res.data);
        if (res.data.status) {
          setAlert({ message: res.data.msg, type: "success" });
          setemail("");
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
    setemail("");
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
      <h2 className="mb-4 text-center text-dark">Forgot?</h2>
      {/* ✅ Alert Message */}
      {alert.message && (
        <div className={`alert alert-${alert.type} text-center`} role="alert">
          {alert.message}
        </div>
      )}
      <form action="" onSubmit={Handlesubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email
          </label>{" "}
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
        <button type="submit" className="btn btn-success w-100 fw-bold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Forgot;
