let Mongoose = require("mongoose");

let Userschema = new Mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

let Authenticate = Mongoose.model("Authenticate", Userschema);
module.exports = Authenticate;
