let Express = require("express");
let Mongoose = require("mongoose");
let Cors = require("cors");
let Dotenv = require("dotenv");
const Router = require("./module/User.routes");
Dotenv.config();

let App = Express();

//middlewares

App.use(Express.json()); //body-parser
App.use(Cors());

Mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((e) => {
    console.log("Database connection failed!");
  });

//routes
App.use("/api", Router);

let Port = process.env.PORT;
App.listen(Port, () => {
  console.log(`Server running on the port:${Port}`);
});
