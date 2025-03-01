import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Getuser from "./Getuser";

const Home = () => {
  let name = localStorage.getItem("name") || "User";
  let role = localStorage.getItem("role") || "Guest";

  let navigate = useNavigate();

  let handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
        }}
      >
        <div
          style={{
            padding: "30px",
            borderRadius: "12px",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            maxWidth: "400px",
            width: "90%",
          }}
        >
          <h1 style={{ color: "#ff5733", fontWeight: "bold" }}>
            Hello, {role}!
          </h1>
          <h4 style={{ color: "#555" }}>Welcome, {name}!</h4>
          {role === "admin" && (
            <Link
              to="/getuser"
              style={{
                display: "inline-block",
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px 10px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "6px",
                textDecoration: "none",
                marginTop: "10px",
                marginBottom: "10px",
                transition: "0.3s ease-in-out",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              Go Admin
            </Link>
          )}{" "}
          <button
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "6px",
              backgroundColor: "#ff3333",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
