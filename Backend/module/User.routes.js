let Express = require("express");
const Register = require("./controllers/Register");
const Login = require("./controllers/Login");
const Getuser = require("./controllers/Getuser");
const Forgot = require("./controllers/Forgot");
const Reset = require("./controllers/Reset");
const Delete = require("./controllers/Delete");

let Router = Express.Router();

Router.post("/register", Register);
Router.post("/login", Login);
Router.get("/getuser", Getuser);
Router.post("/forgot-password", Forgot);
Router.put("/reset-password/:id/:token", Reset);
Router.delete("/delete/:id", Delete);

module.exports = Router;
