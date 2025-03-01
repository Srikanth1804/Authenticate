let Authenticate = require("../../model/User.model");
let Bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    let Olduser = await Authenticate.findOne({ Email: email });

    if (Olduser) {
      return res.status(400).json({
        status: false,
        msg: "Email already exists!",
      });
    }

    let hashpassword = await Bcrypt.hash(password, 10);

    let Newuser = await Authenticate.create({
      Name: name,
      Email: email,
      Password: hashpassword,
      Role: role,
    });

    return res.status(201).json({
      status: true,
      info: Newuser,
      msg: "Registration successful!",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Registration failed! " + error.message,
    });
  }
};
