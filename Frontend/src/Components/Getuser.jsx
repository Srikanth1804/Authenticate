import React, { useEffect, useState } from "react";
import Axios from "axios";
import API_ENDPOINT from "../Components/Generaldata";

const Getuser = () => {
  let [data, setData] = useState([]);

  useEffect(() => {
    Fetchdata();
  }, []);

  let Fetchdata = () => {
    Axios.get(`${API_ENDPOINT}/api/getuser`)
      .then((res) => {
        setData(res.data.info);
        console.log(res.data.info);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let Handledelete = (id) => {
    let Confirmdelete = window.confirm("Are you sure want to delete?");
    if (!Confirmdelete) return;
    Axios.delete(`${API_ENDPOINT}/api/delete/${id}`)
      .then((res) => {
        console.log(res.data.msg);
        Fetchdata();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h4
        style={{
          textAlign: "center",
          color: "#007bff",
          fontSize: "22px",
          fontWeight: "bold",
          marginBottom: "20px",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        User Datas!
      </h4>
      {data.map((D, index) => (
        <div
          className="row"
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
            padding: "10px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* User Info */}
          <div className="col">
            <div
              className="card"
              style={{
                padding: "15px",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
              }}
            >
              <h5
                style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}
              >
                {D.Name}
              </h5>
              <p style={{ fontSize: "16px", color: "#555" }}>{D.Role}</p>
            </div>
          </div>

          <div
            className="col"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              className="btn btn-danger"
              style={{
                padding: "8px 12px",
                fontSize: "14px",
                fontWeight: "bold",
                borderRadius: "5px",
              }}
              disabled={D.Role == "admin"}
              onClick={(e) => Handledelete(D._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Getuser;
