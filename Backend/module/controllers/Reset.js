let Authenticate = require("../../model/User.model");
let Bcrypt = require("bcrypt");
let Jwt = require("jsonwebtoken");
module.exports = async (req, res) => {
  try {
    let { password } = req.body;
    let { id, token } = req.params;

    let Validatetoken = await Jwt.verify(token, process.env.SECRET_KEY);

    if (!Validatetoken) {
      return res.json({
        status: false,
        msg: "Invalid token !",
      });
    }

    let hashpwd = await Bcrypt.hash(password, 10);

    let Updatepwd = await Authenticate.findByIdAndUpdate(
      id,
      {
        Password: hashpwd,
      },
      { new: true }
    );
    return res.json({
      status: true,
      info: Updatepwd,
      msg: "Password updated!",
    });
  } catch (error) {
    return res.json({
      status: false,

      msg: "Password failed to update!",
    });
  }
};
