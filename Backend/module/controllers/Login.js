let Authenticate = require("../../model/User.model");
let Bcrypt = require("bcrypt");
let Jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    let { email, password } = req.body;

    let Olduser = await Authenticate.findOne({ Email: email });

    if (!Olduser) {
      return res.status(404).json({
        status: false,
        msg: "User not found!",
      });
    }

    let Ismatchpwd = await Bcrypt.compare(password, Olduser.Password);

    if (!Ismatchpwd) {
      return res.status(401).json({
        status: false,
        msg: "Incorrect password!",
      });
    }

    let Token = Jwt.sign({ id: Olduser.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: true,
      info: Token,
      name: Olduser.Name,
      role: Olduser.Role,
      msg: "Login successful!",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Login failed! " + error.message,
    });
  }
};
